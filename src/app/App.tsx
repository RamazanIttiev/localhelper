import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, json, RouterProvider } from 'react-router-dom';

import { Layout } from 'app/Layout';

import { CartContainer } from 'pages/cart/presentation/cart.container.tsx';
import { Categories } from 'pages/categories/categories.tsx';
import { CategoryContainer } from 'pages/category/presentation/category/category.container.tsx';
import { CheckoutContainer } from 'pages/checkout/checkout.container.tsx';
import { FeedContainer } from 'pages/feed/feed.container.ts';
import { ItemDetailsContainer } from 'pages/item-details/item-details.container.tsx';
import { RestaurantItemDetailsContainer } from 'pages/restaurant/restaurant-item-details/restaurant-item-details.container.tsx';
import { RestaurantContainer } from 'pages/restaurant/restaurant.container.tsx';
import { RestaurantsListContainer } from 'pages/restaurants-list/restaurants.container.tsx';

import { categoryLoader } from 'api/airtable/category.ts';
import { feedLoader } from 'api/airtable/feed.ts';
import { itemsLoader } from 'api/airtable/items.ts';
import { restaurantItemsLoader, restaurantLoader, restaurantsLoader } from 'api/airtable/restaurant.ts';
import { geolocationLoader } from 'api/geolocation.ts';

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

			<Route
				path=":categoryId/restaurants"
				element={<RestaurantsListContainer />}
				loader={() => restaurantsLoader(queryClient)}
			/>
			<Route
				path=":categoryId/restaurants/:restaurantId"
				element={<RestaurantContainer />}
				loader={async () => {
					const [restaurants, restaurantsItems] = await Promise.all([
						restaurantLoader(queryClient),
						restaurantItemsLoader(queryClient),
					]);
					return json({ restaurants, restaurantsItems });
				}}
			/>

			<Route path=":categoryId/:item" element={<ItemDetailsContainer />} />

			<Route path=":categoryId/restaurants/:restaurantId/:item" element={<RestaurantItemDetailsContainer />} />

			<Route path="feed" element={<FeedContainer />} loader={() => feedLoader(queryClient)} />

			<Route path="shopping-cart" element={<CartContainer />} loader={() => restaurantItemsLoader(queryClient)} />

			<Route path=":categoryId/:itemId/checkout" element={<CheckoutContainer />} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
