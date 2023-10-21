import { ReactNode } from 'react';

import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

export interface ShoppingCartProviderProps {
	children: ReactNode;
}

export interface ShoppingCartContextProps {
	isCartEmpty: boolean;
	cartItems: CartItem[];
	clearCart: () => void;
	getItemAmount: (id: string) => number;
	decrementCartAmount: (id: string) => void;
	incrementCartAmount: (id: string, restaurantId?: string) => void;
	getCartOrder: (items: RestaurantItem[]) => string;
	getCartTotalAmount: (items: RestaurantItem[]) => number;
	getOrderCheckout: (
		items: RestaurantItem[],
	) => (Pick<RestaurantItem, 'title' | 'amount' | 'image' | 'price'> | undefined)[];
	getCartRestaurant: () => string;
}

export interface CartItem {
	id: string;
	amount: number;
	restaurantTitle: string;
}
