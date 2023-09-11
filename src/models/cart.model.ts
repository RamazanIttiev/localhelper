import { ReactNode } from 'react';

import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';

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
	getCartOrder: (products: RestaurantProduct[]) => string;
	getCartTotalAmount: (products: RestaurantProduct[]) => number;
	getOrderCheckout: (
		products: RestaurantProduct[],
	) => (Pick<RestaurantProduct, 'title' | 'amount' | 'image' | 'price'> | undefined)[];
	getCartRestaurant: () => string;
}

export interface CartItem {
	id: string;
	amount: number;
	restaurantTitle: string;
}
