import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useReactRouter } from '../hooks/useReactRouter';
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
	const { pathname, isServiceRoute } = useReactRouter();

	useDocumentTitle('LocalHelper');

	useEffect(() => {
		webAppIsReady();
		expandWebApp();
		enableWebAppClosingConfirmation();
		pathname === '/' ? hideBackButton() : showBackButton();
		handleBackButton(() => navigate(-1));
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

			{pathname !== '/' && !isServiceRoute && !isUserAgentTelegram && <Header />}

			<Outlet />
		</>
	);
};
