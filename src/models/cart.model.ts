import { ReactNode } from 'react';
import { FoodModel } from './productModel';

export interface ShoppingCartProviderProps {
	children: ReactNode;
}

export interface ShoppingCartContextProps {
	incrementCartAmount: (id: string, restaurant: string[]) => void;
	decrementCartAmount: (id: string) => void;
	clearCart: () => void;
	cartItems: CartItem[];
	cartTotalAmount: number;
	isCartEmpty: boolean;
	cartOrder: string;
	orderCheckout: (Pick<FoodModel, 'title' | 'amount' | 'image' | 'price'> | undefined)[];
}

export interface CartItem {
	id: string;
	amount: number;
	restaurant: string[];
}
