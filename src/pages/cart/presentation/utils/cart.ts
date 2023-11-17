import { CartItem } from 'pages/cart/domain/model/cart.model';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

export const getCartOrderString = (orderItems: string[]) =>
	`${JSON.stringify(orderItems, null, 2)}`.replace(/\[|\]|"/g, '');

export const getMappedCartList = (items: RestaurantItem[], cartItems: CartItem[]) => {
	return items?.filter(item => {
		return cartItems.some(cartItem => {
			return cartItem.id === item.id;
		});
	});
};