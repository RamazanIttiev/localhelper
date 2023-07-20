import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import {
	enableWebAppClosingConfirmation,
	expandWebApp,
	handleBackButton,
	hideBackButton,
	showBackButton,
	webAppIsReady,
} from '../actions/webApp-actions';
import { useDocumentTitle } from 'usehooks-ts';
import { useReactRouter } from '../hooks/useReactRouter';
import { ShoppingCartProvider } from '../context/cart.context';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const Layout = () => {
	const navigate = useNavigate();
	const { pathname } = useReactRouter();

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

			<ShoppingCartProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Outlet />
				</LocalizationProvider>
			</ShoppingCartProvider>
		</>
	);
};
