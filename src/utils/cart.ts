import { ProductModel } from '../models/productModel';

export const isProductInCart = (products: ProductModel[], selectedProduct: ProductModel | undefined) =>
	products.find(product => product.id === selectedProduct?.id);

export const incrementProductInCart = (products: ProductModel[], selectedProduct: ProductModel) => {
	const existingProduct = products.map(product => {
		return product.id === selectedProduct.id ? { ...product, amount: product.amount + 1 } : product;
	});
	localStorage.setItem('products', JSON.stringify(existingProduct));
	return existingProduct;
};

export const decrementProduct = (accumulator: ProductModel[], product: ProductModel) => {
	const severalProducts = [...accumulator, { ...product, amount: product.amount - 1 }];
	localStorage.setItem('products', JSON.stringify(severalProducts));
	return severalProducts;
};

export const removeProductFromCart = (accumulator: ProductModel[]) => {
	localStorage.setItem('products', JSON.stringify(accumulator));
	return accumulator;
};

export const addNewProductToCart = (products: ProductModel[], selectedProduct: ProductModel) => {
	const newProduct = [...products, { ...selectedProduct, amount: 1 }];
	localStorage.setItem('products', JSON.stringify(newProduct));
	return newProduct;
};

export const getOrderString = (orderItems: string[], cartTotalAmount: number) =>
	`
Ваш заказ: 
	
			${JSON.stringify(orderItems, null, 2)} 
		
Total: ${cartTotalAmount}

Доставка: бесплатно
Способ оплаты: наличные`.replace(/\[|\]|"/g, '');
