import React, { useEffect } from 'react';
import { Footer } from '../components/footer';
import { useCart } from '../pages/cart/hooks/useCart';
import { Outlet, useNavigate } from 'react-router-dom';
import { useReactRouter } from '../hooks/useReactRouter';
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
import { Global } from '@emotion/react';
import { isUserAgentTelegram } from '../utils/deviceInfo';
import { Header } from '../components/header';

export const Layout = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useCart();
	const { pathname, isRestaurantRoute } = useReactRouter();

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
			<Global
				styles={{
					'.PrivateSwipeArea-root': {
						zIndex: '0 !important',
					},
				}}
			/>

			{pathname !== '/' && !isRestaurantRoute && !isUserAgentTelegram && <Header />}

			<Outlet />

			{!isCartEmpty && isRestaurantRoute && <CartContainer />}

			<Footer />
		</>
	);
};
