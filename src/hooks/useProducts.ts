import { FoodModel } from '../models/productModel';

export const useProducts = () => {
	const getProductFromCart = (cartProducts: FoodModel[], selectedProduct: FoodModel | undefined) =>
		cartProducts.find(product => product.id === selectedProduct?.id);

	const checkProductInCart = (cartProducts: FoodModel[], selectedProduct: FoodModel | undefined) =>
		Boolean(getProductFromCart(cartProducts, selectedProduct));

	const isSameRestaurant = (cartProducts: FoodModel[], selectedProduct: FoodModel | undefined) => {
		if (cartProducts.length === 0) return true;

		return cartProducts.some(product => {
			return (
				product.Restaurants !== undefined &&
				selectedProduct?.Restaurants !== undefined &&
				product.Restaurants[0] === selectedProduct?.Restaurants[0]
			);
		});
	};
	return { checkProductInCart, getProductFromCart, isSameRestaurant };
};
