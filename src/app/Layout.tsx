import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { useCart } from '../pages/cart/hooks/useCart';
import { Outlet, useNavigate } from 'react-router-dom';
import { useReactRouter } from '../hooks/useReactRouter';
import { isUserAgentTelegram } from '../utils/deviceInfo';
import { CartContainer } from '../pages/cart/cart.container';
import {
	enableWebAppClosingConfirmation,
	expandWebApp,
	handleBackButton,
	hideBackButton,
	showBackButton,
	webAppIsReady,
} from '../actions/webApp-actions';
import { useDocumentTitle } from 'usehooks-ts';

export const Layout = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useCart();
	const { pathname } = useReactRouter();

	useDocumentTitle('LocalHelper');

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
				<Outlet />
			</Container>

			{!isCartEmpty && pathname === '/food' && <CartContainer />}

			<Footer />
		</>
	);
};
