import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';

import Airtable from 'airtable';
import { Container } from '@mui/material';
import { Products } from '../views/products';
import { Footer } from '../components/footer';
import { Categories } from '../views/categories';
import { ProductDetails } from '../views/productDetails';
import { ProductModel } from '../models/productModel';
import {
	addNewProductToCart,
	decrementProduct,
	incrementProductInCart,
	isProductInCart,
	removeProductFromCart,
} from '../utils/cart';
import { getAirtableView } from '../hooks';
import { CartContainer } from '../views/cart/cart.container';
import { Header } from '../components/header';
import { isUserAgentTelegram } from '../utils/deviceInfo';

export const Telegram = window.Telegram;
export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

const App = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const routeData = useMatch('/:categoryId');
	const productDetailsParams = useMatch('/:categoryId/:productId');
	const [cartProducts, setCartProducts] = useState<ProductModel[] | []>([]);
	const isCartEmpty = cartProducts.length === 0;

	const botIdForCart = getAirtableView(routeData?.params.categoryId);

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

	const clearState = () => setCartProducts([]);

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
		<>
			{pathname !== '/' && !isUserAgentTelegram && <Header cartProducts={cartProducts} />}

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
				</Routes>
			</Container>
			{!isCartEmpty &&
				(pathname === '/food' || productDetailsParams?.pattern.path === '/:categoryId/:productId') && (
					<CartContainer
						addToCart={addToCart}
						clearState={clearState}
						cartProducts={cartProducts}
						botIdForCart={botIdForCart}
						removeFromCart={removeFromCart}
					/>
				)}
			<Footer />
		</>
	);
};

export default App;
