import { Global } from '@emotion/react';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useDocumentTitle } from 'usehooks-ts';

import { Footer } from 'components/footer';

import { isUserAgentTelegram } from 'utils/deviceInfo';

import {
	enableWebAppClosingConfirmation,
	expandWebApp,
	handleBackButton,
	hideBackButton,
	showBackButton,
	webAppIsReady,
} from 'actions/webApp-actions';

import { ShoppingCartProvider } from 'context/cart.context';

export const Layout = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useDocumentTitle('LocalHelper');

	useEffect(() => {
		webAppIsReady();
		expandWebApp();
		enableWebAppClosingConfirmation();
		pathname === '/' ? hideBackButton() : showBackButton();
		handleBackButton(() => navigate(-1));
	}, [pathname, navigate]);

	const footerIsVisible = !pathname.includes('checkout') && isUserAgentTelegram;

	return (
		<>
			<Global
				styles={{
					'.PrivateSwipeArea-root': {
						zIndex: '0 !important',
					},
				}}
			/>

			<ShoppingCartProvider>
				<Outlet />
				{footerIsVisible && <Footer />}
			</ShoppingCartProvider>
		</>
	);
};
