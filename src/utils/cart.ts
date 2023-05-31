import { FoodModel } from '../models/productModel';

export const incrementProductInCart = (products: FoodModel[], selectedProduct: FoodModel) => {
	return products.map(product => {
		if (product.id === selectedProduct.id) {
			if (selectedProduct.extraOptions !== undefined) {
				return selectedProduct;
			} else {
				return product.amount !== undefined ? { ...product, amount: product.amount + 1 } : product;
			}
		}
		return product;
	});
};

export const decrementProduct = (accumulator: FoodModel[], product: FoodModel) => {
	return [...accumulator, { ...product, amount: product.amount !== undefined ? product.amount - 1 : 0 }];
};

export const addNewProductToCart = (products: FoodModel[], selectedProduct: FoodModel) => {
	if (selectedProduct.extraOptions !== undefined) {
		return [...products, { ...selectedProduct }];
	} else return [...products, { ...selectedProduct, amount: 1 }];
};

export const getCartOrderString = (orderItems: string[]) =>
	`${JSON.stringify(orderItems, null, 2)}`.replace(/\[|\]|"/g, '');
