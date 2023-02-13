import React, { useState } from 'react';
import Airtable from 'airtable';
import { Layout } from '../views/layout';
import { Header } from '../views/header';
import { ProductModel } from '../models/cardModel';
import { ShoppingCart } from '../components/shoppingCart';

export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

export const App = () => {
	const [cart, setCart] = useState<ProductModel[] | []>([]);

	const addToCart = (selectedItem: ProductModel, quantity: number) => {
		setCart(prevState => {
			const isItemInCart = prevState.find(item => item.id === selectedItem.id);

			if (isItemInCart) {
				return prevState.map(item =>
					item.id === selectedItem.id ? { ...item, quantity: item.quantity + 1 } : item,
				);
			}
			return [...prevState, { ...selectedItem, quantity }];
		});
	};
	const removeFromCart = (id: number) => {
		setCart(prevState => {
			return (prevState as ProductModel[]).reduce(
				(acc: [] | ProductModel[], item: ProductModel): ProductModel[] => {
					if (item.id === id) {
						console.log(item.quantity);
						if (item.quantity === 1) return acc;
						return [...acc, { ...item, quantity: item.quantity - 1 }];
					} else {
						return [...acc, item];
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
