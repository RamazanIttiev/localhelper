import { FoodModel } from '../models/productModel';

export const incrementProductInCart = (products: FoodModel[], selectedProduct: FoodModel) => {
	return products.map(product => {
		return product.id === selectedProduct.id && product.amount !== undefined
			? { ...product, amount: product.amount + 1 }
			: product;
	});
};

export const decrementProduct = (accumulator: FoodModel[], product: FoodModel) => {
	return [...accumulator, { ...product, amount: product.amount !== undefined ? product.amount - 1 : 0 }];
};

export const addNewProductToCart = (products: FoodModel[], selectedProduct: FoodModel) => {
	return [...products, { ...selectedProduct, amount: 1 }];
};

export const getCartOrderString = (orderItems: string[]) =>
	`${JSON.stringify(orderItems, null, 2)}`.replace(/\[|\]|"/g, '');
