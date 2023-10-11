import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, json, Route, RouterProvider } from 'react-router-dom';

import { Layout } from 'app/Layout';

import { CartContainer } from 'pages/cart/cart.container';
import { Categories } from 'pages/categories/categories';
import { CheckoutContainer } from 'pages/checkout/checkout.container';
import { FeedContainer } from 'pages/feed/feed.container';
import { ItemDetailsContainer } from 'pages/item-details/item-details.container';
import { ItemsList } from 'pages/items-list/items-list';
import { RestaurantItemDetailsContainer } from 'pages/restaurant/restaurant-item-details/restaurant-item-details.container';
import { RestaurantContainer } from 'pages/restaurant/restaurant.container';
import { RestaurantsListContainer } from 'pages/restaurants-list/restaurants.container';

import { categoryLoader } from 'api/airtable/category';
import { feedLoader } from 'api/airtable/feed';
import { itemsLoader } from 'api/airtable/items';
import { restaurantLoader, restaurantItemsLoader, restaurantsLoader } from 'api/airtable/restaurant';
import { getExchangeRate } from 'api/exchangeRate';
import { geolocationLoader } from 'api/geolocation';

import { WebApp, WebAppTheme, WebAppUser } from 'theme/types';

const queryClient = new QueryClient();

export const TgWebApp: WebApp = window.Telegram.WebApp;
export const TgUser: WebAppUser | undefined = TgWebApp.initDataUnsafe.user;
export const TgTheme: WebAppTheme = TgWebApp.themeParams;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Categories />} loader={() => geolocationLoader(queryClient)} />
			<Route
				path=":categoryId"
				element={<ItemsList />}
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

			<Route
				path="shopping-cart"
				element={<CartContainer />}
				loader={() => restaurantProductsLoader(queryClient)}
			/>

			<Route path=":categoryId/:productId/checkout" element={<CheckoutContainer />} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
