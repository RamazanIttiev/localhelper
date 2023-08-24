import { ReactNode } from 'react';
import { RestaurantProductModel } from '../pages/restaurant/components/restaurant-product/restaurant-product.model';

export interface ShoppingCartProviderProps {
	children: ReactNode;
}

export interface ShoppingCartContextProps {
	incrementCartAmount: (id: string, restaurant: string) => void;
	decrementCartAmount: (id: string) => void;
	clearCart: () => void;
	cartItems: CartItem[];
	getCartTotalAmount: (products: RestaurantProductModel[]) => number;
	isCartEmpty: boolean;
	getCartOrder: (products: RestaurantProductModel[]) => string;
	getItemAmount: (id: string) => number;
	getOrderCheckout: (
		products: RestaurantProductModel[],
	) => (Pick<RestaurantProductModel, 'title' | 'amount' | 'image' | 'price'> | undefined)[];
	findProduct: (products: RestaurantProductModel[], id: string) => RestaurantProductModel | undefined;
}

export interface CartItem {
	id: string;
	amount: number;
	restaurantTitle: string;
}
