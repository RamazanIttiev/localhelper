import { Global } from '@emotion/react';
import { useHapticFeedback, WebAppProvider, BackButton } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { TgWebApp, TgTheme } from 'app/App.tsx';

import { useDocumentTitle } from 'usehooks-ts';

import {
	webAppIsReady,
	expandWebApp,
	enableWebAppClosingConfirmation,
	hideBackButton,
	showBackButton,
} from 'actions/webApp-actions.ts';

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
