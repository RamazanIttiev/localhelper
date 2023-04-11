import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Airtable from 'airtable';
import { Container } from '@mui/material';
import { Products } from '../pages/products/products';
import { Footer } from '../components/footer';
import { Categories } from '../pages/categories/categories';
import { ProductDetailsContainer } from '../pages/productDetails/productDetails.container';
import { CartContainer } from '../pages/cart/cart.container';
import { Header } from '../components/header';
import { isUserAgentTelegram } from '../utils/deviceInfo';
import { useCart } from '../pages/cart/hooks/useCart';
import { useReactRouter } from '../hooks/useReactRouter';
import {
	enableWebAppClosingConfirmation,
	expandWebApp,
	handleBackButton,
	hideBackButton,
	showBackButton,
	webAppIsReady,
} from '../actions/webApp-actions';

export const Telegram = window.Telegram;

export const airtableBase = new Airtable({
	apiKey: process.env.REACT_APP_AIRTABLE_PRIVATE_KEY,
}).base('appN5D5g87uz2gY2j');

const App = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useCart();
	const { pathname, productDetailsRoute } = useReactRouter();

	useEffect(() => {
		webAppIsReady();
		expandWebApp();
		enableWebAppClosingConfirmation();
		pathname === '/' ? hideBackButton() : showBackButton();
		handleBackButton(navigate);
	}, [pathname, navigate]);
	return (
		<>
			{pathname !== '/' && !isUserAgentTelegram && <Header />}

			<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
				<Routes>
					<Route path="/" element={<Categories />} />
					<Route path=":categoryId" element={<Products />} />
					<Route path=":categoryId/:productId" element={<ProductDetailsContainer />} />
				</Routes>
			</Container>

			{!isCartEmpty &&
				(pathname === '/food' || productDetailsRoute?.pattern.path === '/:categoryId/:productId') && (
					<CartContainer />
				)}

			<Footer />
		</>
	);
};

export default App;
