import { Global } from '@emotion/react';
import { BackButton, useHapticFeedback, WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { TgTheme, TgWebApp } from 'app/App';

import { useDocumentTitle } from 'usehooks-ts';

import {
	enableWebAppClosingConfirmation,
	expandWebApp,
	hideBackButton,
	showBackButton,
	webAppIsReady,
} from 'actions/webApp-actions';

export const Layout = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [impactOccurred] = useHapticFeedback();

	useDocumentTitle('LocalHelper');

	useEffect(() => {
		webAppIsReady();
		expandWebApp();
		enableWebAppClosingConfirmation();
		pathname === '/' ? hideBackButton() : showBackButton();

		TgWebApp.setHeaderColor(TgTheme.secondary_bg_color || '#1C1C1D');
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

			<WebAppProvider
				options={{
					smoothButtonsTransition: true,
				}}>
				<BackButton
					onClick={() => {
						impactOccurred('light');
						navigate(-1);
					}}
				/>
				<Outlet />
			</WebAppProvider>
		</>
	);
};
