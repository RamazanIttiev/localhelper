import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Airtable from 'airtable';
import { Container } from '@mui/material';
import { Products } from '../views/products';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Categories } from '../views/categories';
import { ProductDetails } from '../views/productDetails';
import { CartContainer } from '../views/cart/cart.container';
import { ProductModel } from '../models/productModel';
import {
	addNewProductToCart,
	decrementProduct,
	incrementProductInCart,
	isProductInCart,
	removeProductFromCart,
} from '../utils/cart';

export const Telegram = window.Telegram;
export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

const App = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [cartProducts, setCartProducts] = useState<ProductModel[] | []>([]);

	useEffect(() => {
		Telegram.WebApp.ready();
		Telegram.WebApp.expand();
		Telegram.WebApp.enableClosingConfirmation();

		pathname !== '/' ? Telegram.WebApp.BackButton.show() : Telegram.WebApp.BackButton.hide();
		Telegram.WebApp.onEvent('backButtonClicked', () => {
			navigate(-1);
		});
	}, [navigate, pathname]);

	useEffect(() => {
		setCartProducts(JSON.parse(localStorage.getItem('products') || '[]'));
	}, []);

	const handleEmptyCart = () => {
		setCartProducts([]);
		localStorage.removeItem('products');
		navigate('/food');
	};

	const addToCart = (selectedProduct: ProductModel) => {
		Telegram.WebApp.HapticFeedback.impactOccurred('soft');
		setCartProducts(prevState => {
			if (isProductInCart(prevState, selectedProduct)) {
				return incrementProductInCart(prevState, selectedProduct);
			} else {
				return addNewProductToCart(prevState, selectedProduct);
			}
		});
	};
	const removeFromCart = (selectedProduct: ProductModel) => {
		Telegram.WebApp.HapticFeedback.impactOccurred('soft');
		setCartProducts(prevState => {
			return (prevState as ProductModel[]).reduce(
				(accumulator: [] | ProductModel[], product: ProductModel): ProductModel[] => {
					if (product.id === selectedProduct.id) {
						if (product.amount! === 1) {
							pathname === '/shopping-cart' && cartProducts.length === 1 && navigate('/food');
							return removeProductFromCart(accumulator);
						}
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
			{pathname !== '/' && <Header cartProducts={cartProducts} handleEmptyCart={handleEmptyCart} />}

			<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
				<Routes>
					<Route path="/" element={<Categories />} />

					<Route
						path=":categoryId"
						element={
							<Products
								addToCart={addToCart}
								cartProducts={cartProducts}
								removeFromCart={removeFromCart}
							/>
						}
					/>
					<Route
						path=":categoryId/:productId"
						element={
							<ProductDetails
								addToCart={addToCart}
								cartProducts={cartProducts}
								removeFromCart={removeFromCart}
							/>
						}
					/>
					<Route
						path="shopping-cart"
						element={
							<CartContainer
								addToCart={addToCart}
								cartProducts={cartProducts}
								removeFromCart={removeFromCart}
							/>
						}
					/>
				</Routes>
			</Container>
			<Footer />
		</div>
	);
};

export default App;
