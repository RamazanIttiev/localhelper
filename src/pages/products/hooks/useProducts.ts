import { ProductModel } from '../../productDetails/models/productModel';

export const useProducts = () => {
	const getProductFromCart = (cartProducts: ProductModel[], selectedProduct: ProductModel | undefined) =>
		cartProducts.find(product => product.id === selectedProduct?.id);

	const checkProductInCart = (cartProducts: ProductModel[], selectedProduct: ProductModel | undefined) =>
		Boolean(getProductFromCart(cartProducts, selectedProduct));

	return { checkProductInCart, getProductFromCart };
};
