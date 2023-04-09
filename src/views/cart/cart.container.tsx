import React, { FC, useEffect, useState } from 'react';
import { Cart } from './cart.component';
import { useMatch } from 'react-router-dom';
import { getAirtableView } from '../../hooks';
import { ErrorType } from '../../models/error';
import { getFoodCartString } from '../../utils/cart';
import { ProductModel } from '../../models/productModel';
import { handleOrder } from '../../actions/global-actions';

interface CartContainerProps {
	cartProducts: ProductModel[] | [];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const CartContainer: FC<CartContainerProps> = ({ cartProducts, addToCart, removeFromCart }) => {
	const routeData = useMatch('/:categoryId');
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		if (errorState.isError !== null) {
			setTimeout(() => {
				setErrorState({
					message: '',
					isError: null,
				});
			}, 5000);
		}
	}, [errorState]);

	const idForBot = getAirtableView(routeData?.params.categoryId);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const cartTotalAmount = (cartProducts as ProductModel[]).reduce((previous, current): number => {
		return previous + current.amount! * current.price;
	}, 0);

	const orderItems = cartProducts.map(({ title, amount, price }, id) => {
		return `${id + 1}. ${title} ${amount} x ${price}`;
	});

	const cartOrder = getFoodCartString(orderItems, cartTotalAmount);

	const handleCartOrder = () => handleOrder(idForBot, cartOrder, handleLoading, handleError);

	return (
		<Cart
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
