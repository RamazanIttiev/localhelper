import React, { FC, useEffect, useState } from 'react';
import { Cart } from './cart.component';
import { useMatch } from 'react-router-dom';
import { getAirtableView } from '../../hooks';
import { ErrorType } from '../../models/error';
import { ProductModel } from '../../models/productModel';
import { sendWebAppDeepLink } from '../../utils/requests';
import { getOrderString } from '../../utils/cart';

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

	const cartTotalAmount = (cartProducts as ProductModel[]).reduce((previous, current): number => {
		return previous + current.amount * current.price;
	}, 0);

	const orderItems = cartProducts.map(({ title, amount, price }, id) => {
		return `${id + 1}. ${title} ${amount} x ${price}`;
	});

	const order = getOrderString(orderItems, cartTotalAmount);
	const idForBot = getAirtableView(routeData?.params.categoryId);

	const handleOrder = async () => {
		setLoading(true);
		try {
			const result = await sendWebAppDeepLink(idForBot, 'lhelper', order);
			if (!result.ok) {
				setLoading(false);
				setErrorState({ message: 'Try again later', isError: true });
			} else {
				setErrorState({ message: 'Success', isError: false });
				setLoading(false);
			}
		} catch (error) {
			setErrorState({
				message: typeof error === 'string' ? error : 'Try again later',
				isError: true,
			});
		}
	};

	return (
		<Cart
			loading={loading}
			addToCart={addToCart}
			errorState={errorState}
			handleOrder={handleOrder}
			cartProducts={cartProducts}
			removeFromCart={removeFromCart}
			cartTotalAmount={cartTotalAmount}
		/>
	);
};
