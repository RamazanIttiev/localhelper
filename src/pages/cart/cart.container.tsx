import { useCallback, useEffect, useState } from 'react';
import { CartUI } from './cart.component';
import { useCart } from './hooks/useCart';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { ErrorType } from '../../models/error';
import { useLocation } from 'react-router-dom';
import { getCartOrderString } from './utils/cart.utlis';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';

export const CartContainer = () => {
	const { state } = useLocation();
	const { addToCart, removeFromCart, cartProducts } = useCart();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);
	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const orderItems = cartProducts.map(({ title, amount, price }, id) => {
		return `${id + 1}. ${title} ${amount} x ${price}`;
	});

	const cartTotalAmount = cartProducts.reduce((previous, current): number => {
		if (current.amount !== undefined) {
			return previous + current.amount * current.price;
		}
		return current.price;
	}, 0);

	const cartOrder = getCartOrderString(orderItems);

	const handleCartOrder = useCallback(() => {
		return handleOrder(
			state?.flowId,
			{
				order: cartOrder,
				orderTotal: cartTotalAmount,
				coordinates: state?.coordinates,
			},
			handleLoading,
			handleError,
		);
	}, [cartOrder, cartTotalAmount, state?.coordinates, state?.flowId]);

	useEffect(() => {
		showMainButton();
		handleMainButton(handleCartOrder);

		return () => {
			removeMainButtonEvent(handleCartOrder);
		};
	}, [handleCartOrder]);

	useEffect(() => {
		setMainButtonText(`${cartTotalAmount.toString()} Rs`);
	}, [cartTotalAmount]);

	return (
		<CartUI
			loading={loading}
			addToCart={addToCart}
			errorState={errorState}
			cartProducts={cartProducts}
			handleOrder={handleCartOrder}
			removeFromCart={removeFromCart}
			cartTotalAmount={cartTotalAmount}
		/>
	);
};
