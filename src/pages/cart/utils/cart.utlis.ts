import { ProductModel } from '../../../models/productModel';

export const incrementProductInCart = (products: ProductModel[], selectedProduct: ProductModel) => {
	return products.map(product => {
		return product.id === selectedProduct.id && product.amount !== undefined
			? { ...product, amount: product.amount + 1 }
			: product;
	});
};

export const decrementProduct = (accumulator: ProductModel[], product: ProductModel) => {
	return [...accumulator, { ...product, amount: product.amount !== undefined ? product.amount - 1 : 0 }];
};

export const addNewProductToCart = (products: ProductModel[], selectedProduct: ProductModel) => {
	return [...products, { ...selectedProduct, amount: 1 }];
};

export const getCartOrderString = (orderItems: string[]) =>
	`
Ваш заказ: 
	
			${JSON.stringify(orderItems, null, 2)} 
		
Доставка: 1 км = 100 Rs
Способ оплаты: наличные`.replace(/\[|\]|"/g, '');
