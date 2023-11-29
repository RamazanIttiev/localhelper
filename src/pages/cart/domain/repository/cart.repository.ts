import { Cart } from 'pages/cart/domain/model/cart.model.ts';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';

export interface CartRepository {
	readonly isCartEmpty: boolean;
	readonly clearCart: () => void;
	readonly getCartItems: () => Cart;
	readonly getCartRestaurant: () => string;
	readonly getItemQuantity: (id: string) => number;
	readonly decrementItemQuantity: (id: string) => void;
	readonly getTotalPrice: (items: RestaurantItem[]) => number;
	readonly incrementItemQuantity: (id: string, restaurantId?: string) => void;
	readonly getCartOrder: (items: RestaurantItem[]) => string;
	readonly getOrderCheckout: (
		items: RestaurantItem[],
	) => (Pick<RestaurantItem, 'title' | 'quantity' | 'image' | 'price'> | undefined)[];
}
