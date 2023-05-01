import { ProductModel } from '../../../models/productModel';

export const useProducts = () => {
	const getProductFromCart = (cartProducts: ProductModel[], selectedProduct: ProductModel | undefined) =>
		cartProducts.find(product => product.id === selectedProduct?.id);

	const checkProductInCart = (cartProducts: ProductModel[], selectedProduct: ProductModel | undefined) =>
		Boolean(getProductFromCart(cartProducts, selectedProduct));

	const isSameRestaurant = (cartProducts: ProductModel[], selectedProduct: ProductModel | undefined) => {
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
