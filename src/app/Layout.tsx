import React, { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
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

export const Layout = () => {
	const navigate = useNavigate();
	const { pathname } = useReactRouter();
	const productPageData = useLoaderData() as any;
	console.log(productPageData);
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

			<Outlet />
		</>
	);
};
