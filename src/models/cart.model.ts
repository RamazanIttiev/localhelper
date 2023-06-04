import { ReactNode } from 'react';
import { FoodExtraOptions, FoodModel, ProductModel } from './product.model';

export interface ShoppingCartProviderProps {
	children: ReactNode;
}

export interface ShoppingCartContextProps {
	incrementCartAmount: (id: string, restaurant: string[], extraOptions?: FoodExtraOptions) => void;
	decrementCartAmount: (id: string) => void;
	clearCart: () => void;
	cartItems: CartItem[];
	getCartTotalAmount: (products: ProductModel[]) => number;
	isCartEmpty: boolean;
	getCartOrder: (products: ProductModel[]) => string;
	getItemAmount: (id: string) => number;
	getOrderCheckout: (
		products: ProductModel[],
	) => (Pick<FoodModel, 'title' | 'amount' | 'image' | 'price'> | undefined)[];
	findProduct: (products: ProductModel[], id: string) => FoodModel | undefined;
	addNewProduct: (product: CartItem) => void;
}

export interface CartItem {
	id: string;
	amount: number;
	restaurant: string[];
	extraOptions?: FoodExtraOptions;
}
