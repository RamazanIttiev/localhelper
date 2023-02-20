import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import { Layout } from '../views/layout';
import { Header } from '../views/header';
import { ProductModel } from '../models/productModel';
import { mapFoodData } from '../services/mappers';
import { useCategory } from '../hooks/useCategory';
import { CartContainer } from '../views/cart/cart.container';

import {
	addNewProductToCart,
	decrementProduct,
	incrementProductInCart,
	isProductInCart,
	removeProductFromCart,
} from '../utils/cart';

export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

export const App = () => {
	const currentCategory = useCategory();
	const [isCartOpened, setOpenCart] = useState(false);
	const [products, setProducts] = useState<ProductModel[]>([]);
	const [cart, setCart] = useState<ProductModel[] | []>(JSON.parse(localStorage.getItem('products') || '[]'));

	useEffect(() => {
		airtableBase(currentCategory)
			.select({
				view: currentCategory,
			})
			.eachPage(records => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return setProducts(mapFoodData(records));
			});
	}, [currentCategory]);

	const toggleCart = () => {
		setOpenCart(!isCartOpened);
	};

	const addToCart = (selectedProduct: ProductModel) => {
		setCart(prevState => {
			if (isProductInCart(prevState, selectedProduct)) {
				return incrementProductInCart(prevState, selectedProduct);
			} else {
				return addNewProductToCart(prevState, selectedProduct);
			}
		});
	};

	const removeFromCart = (selectedProduct: ProductModel) => {
		setCart(prevState => {
			return (prevState as ProductModel[]).reduce(
				(accumulator: [] | ProductModel[], product: ProductModel): ProductModel[] => {
					if (product.id === selectedProduct.id) {
						if (product.amount === 1) return removeProductFromCart(accumulator);
						return decrementProduct(accumulator, product);
					} else {
						return [...accumulator, product];
					}
				},
				[] as ProductModel[],
			);
		});
	};

	return (
		<div className="App">
			<Header toggleCart={toggleCart} />
			<Layout cart={cart} products={products} addToCart={addToCart} removeFromCart={removeFromCart} />
			{isCartOpened && (
				<CartContainer
					cart={cart}
					isCartOpened={isCartOpened}
					toggleCart={toggleCart}
					addToCart={addToCart}
					removeFromCart={removeFromCart}
				/>
			)}
		</div>
	);
};
