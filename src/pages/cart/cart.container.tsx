import { useCallback, useEffect, useState } from 'react';
import { CartUI } from './cart.component';
import { useCart } from './hooks/useCart';
import { ErrorType } from '../../models/error';
import { getCartOrderString } from './utils/cart.utlis';
import { useReactRouter } from '../../hooks/useReactRouter';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';

export const CartContainer = () => {
	const { flowId } = useReactRouter();
	const { addToCart, removeFromCart, clearCart, cartProducts } = useCart();

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
		return handleOrder(flowId, { order: cartOrder, orderTotal: cartTotalAmount }, handleLoading, handleError);
	}, [cartOrder, cartTotalAmount, flowId]);

	useEffect(() => {
		showMainButton();
		setMainButtonText(`${cartTotalAmount.toString()} Rs`);
		handleMainButton(handleCartOrder);

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleCartOrder);
		};
	}, [flowId, cartOrder, cartTotalAmount, handleCartOrder]);

	return (
		<CartUI
			loading={loading}
			addToCart={addToCart}
			clearCart={clearCart}
			errorState={errorState}
			cartProducts={cartProducts}
			handleOrder={handleCartOrder}
			removeFromCart={removeFromCart}
			cartTotalAmount={cartTotalAmount}
		/>
	);
};
