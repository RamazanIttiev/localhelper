import { RestaurantProductModel } from 'pages/restaurant/restaurant-product/restaurant-product.model';

import { CartItem } from 'models/cart.model';

export const getCartOrderString = (orderItems: string[]) =>
	`${JSON.stringify(orderItems, null, 2)}`.replace(/\[|\]|"/g, '');

export const getMappedCartList = (products: RestaurantProductModel[], cartItems: CartItem[]) => {
	return products?.filter(product => {
		return cartItems.some(cartItem => {
			return cartItem.id === product.id;
		});
	});
};
