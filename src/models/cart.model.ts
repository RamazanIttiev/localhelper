import { ReactNode } from 'react';

import { RestaurantProductModel } from '../pages/restaurant/restaurant-product/restaurant-product.model';

export interface ShoppingCartProviderProps {
	children: ReactNode;
}

export interface ShoppingCartContextProps {
	isCartEmpty: boolean;
	cartItems: CartItem[];
	clearCart: () => void;
	getItemAmount: (id: string) => number;
	decrementCartAmount: (id: string) => void;
	incrementCartAmount: (id: string, restaurantId: string) => void;
	getCartOrder: (products: RestaurantProductModel[]) => string;
	getCartTotalAmount: (products: RestaurantProductModel[]) => number;
	getOrderCheckout: (
		products: RestaurantProductModel[],
	) => (Pick<RestaurantProductModel, 'title' | 'amount' | 'image' | 'price'> | undefined)[];
	getCartRestaurant: () => string;
}

export interface CartItem {
	id: string;
	amount: number;
	restaurantTitle: string;
}
