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
import { Categories } from '../pages/categories/categories';
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

			<React.Suspense fallback={pathname === '/' && <Categories />}>
				<Await
					resolve={appData}
					errorElement={<div>Could not load data 😬</div>}
					children={appData => {
						return <Outlet context={appData} />;
					}}
				/>
			</React.Suspense>
		</>
	);
};
