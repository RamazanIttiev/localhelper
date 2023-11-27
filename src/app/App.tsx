import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, json, Route, RouterProvider } from 'react-router-dom';

import { Layout } from 'app/Layout';

import { Categories } from 'pages/categories/categories';
import { CategoryContainer } from 'pages/category/presentation/category/category.container';

import { categoryLoader } from 'api/airtable/category';
import { itemsLoader } from 'api/airtable/items';
import { geolocationLoader } from 'api/geolocation';

import { WebApp, WebAppTheme, WebAppUser } from 'ui/theme/types';

const queryClient = new QueryClient();

export const TgWebApp: WebApp = window.Telegram.WebApp;
export const TgUser: WebAppUser | undefined = TgWebApp.initDataUnsafe.user;
export const TgTheme: WebAppTheme = TgWebApp.themeParams;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} loader={() => geolocationLoader(queryClient)}>
			<Route index element={<Categories />} />
			<Route
				path=":categoryId"
				element={<CategoryContainer />}
				loader={async () => {
					const [category, items] = await Promise.all([
						categoryLoader(queryClient),
						itemsLoader(queryClient),
					]);
					return json({ category, items });
				}}
			/>
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
