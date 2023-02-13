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
	const [cart, setCart] = useState<ProductModel[] | []>([]);

	const addToCart = (selectedProduct: ProductModel, amount: number) => {
		setCart(prevState => {
			const isProductInCart = prevState.find(product => product.id === selectedProduct.id);

			if (isProductInCart) {
				return prevState.map(product =>
					product.id === selectedProduct.id ? { ...product, amount: product.amount + 1 } : product,
				);
			}
			return [...prevState, { ...selectedProduct, amount }];
		});
	};
	const removeFromCart = (id: number) => {
		setCart(prevState => {
			return (prevState as ProductModel[]).reduce(
				(acc: [] | ProductModel[], product: ProductModel): ProductModel[] => {
					if (product.id === id) {
						console.log(product.amount);
						if (product.amount === 1) return acc;
						return [...acc, { ...product, amount: product.amount - 1 }];
					} else {
						return [...acc, product];
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

export default App;
