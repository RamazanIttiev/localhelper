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
import { ErrorPage } from '../pages/404/404';
import { useDocumentTitle } from 'usehooks-ts';
import { AppData } from '../models/product.model';
import { useReactRouter } from '../hooks/useReactRouter';
import { ShoppingCartProvider } from '../context/cart.context';
import { Await, Outlet, useLoaderData, useNavigate } from 'react-router-dom';

export const Layout = () => {
	const navigate = useNavigate();
	const { pathname } = useReactRouter();
	const { appData } = useLoaderData() as any;

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

			<React.Suspense fallback={<div>Loading</div>}>
				<Await
					resolve={appData}
					errorElement={<ErrorPage />}
					children={(appData: AppData) => {
						return (
							<ShoppingCartProvider>
								<Outlet context={appData} />
							</ShoppingCartProvider>
						);
					}}
				/>
			</React.Suspense>
		</>
	);
};
