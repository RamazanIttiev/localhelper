import React, { useState } from 'react';
import Airtable from 'airtable';
import { Layout } from '../views/layout';
import { Header } from '../views/header';
import { ProductModel } from '../models/productModel';
import { ShoppingCart } from '../components/shoppingCart';

export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

export const App = () => {
	const [cart, setCart] = useState<ProductModel[] | []>(JSON.parse(localStorage.getItem('products') || '[]'));

	const addToCart = (selectedProduct: ProductModel, amount: number) => {
		setCart(prevState => {
			const isProductInCart = prevState.find(product => product.id === selectedProduct.id);

			if (isProductInCart) {
				const existingProduct = prevState.map(product => {
					return product.id === selectedProduct.id ? { ...product, amount: product.amount + 1 } : product;
				});
				localStorage.setItem('products', JSON.stringify(existingProduct));
				return existingProduct;
			}
			const newProduct = [...prevState, { ...selectedProduct, amount }];
			localStorage.setItem('products', JSON.stringify(newProduct));
			return newProduct;
		});
	};

	const removeFromCart = (id: number) => {
		console.log(id);
		setCart(prevState => {
			return (prevState as ProductModel[]).reduce(
				(acc: [] | ProductModel[], product: ProductModel): ProductModel[] => {
					if (product.id === id) {
						if (product.amount === 1) return acc;
						const existingProduct = [...acc, { ...product, amount: product.amount - 1 }];
						localStorage.setItem('products', JSON.stringify(existingProduct));
						return existingProduct;
					} else {
						const newProduct = [...acc, product];
						localStorage.setItem('products', JSON.stringify(newProduct));
						return newProduct;
					}
				},
				[] as ProductModel[],
			);
		});
	};

	return (
		<div className="App">
			<Header />
			<Layout cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />
			<ShoppingCart cart={cart} />
		</div>
	);
};
