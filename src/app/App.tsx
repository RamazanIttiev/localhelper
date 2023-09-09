import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, json, Route, RouterProvider } from 'react-router-dom';

import { Layout } from 'app/Layout';

import { CartContainer } from 'pages/cart/cart.container';
import { Categories } from 'pages/categories/categories';
import { CheckoutContainer } from 'pages/checkout/checkout.container';
import { FeedContainer } from 'pages/feed/feed.container';
import { ProductDetailsContainer } from 'pages/productDetails/product-details.container';
import { ProductsList } from 'pages/products-list/products-list';
import { RestaurantCheckoutContainer } from 'pages/restaurant-checkout/restaurant-checkout.container';
import { RestaurantProductDetailsContainer } from 'pages/restaurant/restaurant-product-details/restaurant-product-details.container';
import { RestaurantContainer } from 'pages/restaurant/restaurant.container';
import { RestaurantsListContainer } from 'pages/restaurants-list/restaurants.container';

import { categoryLoader } from 'api/airtable/category';
import { feedLoader } from 'api/airtable/feed';
import { productsLoader } from 'api/airtable/products';
import { restaurantLoader, restaurantProductsLoader, restaurantsLoader } from 'api/airtable/restaurant';

import { fetchTelegramUser } from 'actions/webApp-actions';

const queryClient = new QueryClient();
export const Telegram = window.Telegram.WebApp;
export const TelegramUser = window.Telegram.initDataUnsafe?.user;
export const TelegramTheme = Telegram.themeParams !== undefined ? Telegram.themeParams : null;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Categories />} />
			<Route
				path=":categoryId"
				element={<ProductsList />}
				loader={async () => {
					const [category, products] = await Promise.all([
						categoryLoader(queryClient),
						productsLoader(queryClient),
					]);
					return json({ category, products });
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
					const [restaurants, restaurantsProducts] = await Promise.all([
						restaurantLoader(queryClient),
						restaurantProductsLoader(queryClient),
					]);
					return json({ restaurants, restaurantsProducts });
				}}
			/>

			<Route path=":categoryId/:productId" element={<ProductDetailsContainer />} />
			<Route
				path=":categoryId/restaurants/:restaurantId/:productId"
				element={<RestaurantProductDetailsContainer />}
			/>

			<Route path="feed" element={<FeedContainer />} loader={() => feedLoader(queryClient)} />

			<Route
				path="shopping-cart"
				element={<CartContainer />}
				loader={() => restaurantProductsLoader(queryClient)}
			/>

			<Route path="checkout" loader={() => fetchTelegramUser()} element={<RestaurantCheckoutContainer />} />
			<Route path=":categoryId/:productId/checkout" element={<CheckoutContainer />} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
