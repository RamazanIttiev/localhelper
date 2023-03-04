import React, { FC } from 'react';
import { Cart } from './cart.component';
import { ProductModel } from '../../models/productModel';

interface CartContainerProps {
	isCartOpened: boolean;
	toggleCart: () => void;
	cart: ProductModel[] | [];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const CartContainer: FC<CartContainerProps> = ({
	cart,
	isCartOpened,
	toggleCart,
	addToCart,
	removeFromCart,
}) => {
	const cartTotalAmount = (cart as ProductModel[]).reduce((previous, current): number => {
		return previous + current.amount * current.price;
	}, 0);

	return (
		<Cart
			cart={cart}
			addToCart={addToCart}
			toggleCart={toggleCart}
			isCartOpened={isCartOpened}
			removeFromCart={removeFromCart}
			cartTotalAmount={cartTotalAmount}
			// sendWebAppDeepLink={sendWebAppDeepLink}
		/>
	);
};
