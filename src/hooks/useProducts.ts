import { FoodModel } from '../models/productModel';
import { CartItem } from '../models/cart.model';

export const useProducts = () => {
	const getProductFromCart = (cartItems: CartItem[], id: string | undefined) =>
		cartItems.find(product => product.id === id);

	const checkProductInCart = (cartItems: CartItem[], selectedProduct: FoodModel | undefined) =>
		Boolean(getProductFromCart(cartItems, selectedProduct?.id));

	return { checkProductInCart, getProductFromCart };
};
