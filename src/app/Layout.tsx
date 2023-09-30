import { Global } from '@emotion/react';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { TgTheme, TgWebApp } from 'app/App';

import { useDocumentTitle } from 'usehooks-ts';

import { Footer } from 'components/footer';

import { isUserAgentTelegram } from 'utils/deviceInfo';
import { addOpacityToHexColor } from 'utils/service';

import {
	enableWebAppClosingConfirmation,
	expandWebApp,
	handleBackButton,
	hideBackButton,
	setHaptic,
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
		handleBackButton(() => {
			setHaptic('soft');
			navigate(-1);
		});

		TgWebApp.setHeaderColor(addOpacityToHexColor(TgTheme.secondary_bg_color || '#1C1C1D', 0.06));
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
