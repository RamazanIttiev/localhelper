import React from 'react';
import { Layout } from './Layout';
import { Products } from '../pages/products/products';
import { Categories } from '../pages/categories/categories';
import { RestaurantsListContainer } from '../pages/restaurants-list/restaurants.container';
import { createBrowserRouter, createRoutesFromElements, json, Route, RouterProvider } from 'react-router-dom';
import { ProductDetailsContainer } from '../pages/productDetails/product-details.container';
import { CheckoutContainer } from '../pages/checkout/checkout.container';
import { fetchTelegramUser } from '../actions/webApp-actions';
import { CartContainer } from '../pages/cart/cart.container';
import { categoryLoader } from '../api/airtable/category';
import { QueryClient } from '@tanstack/react-query';
import { productsLoader } from '../api/airtable/products';
import { restaurantLoader, restaurantProductsLoader, restaurantsLoader } from '../api/airtable/restaurant';
import { RestaurantContainer } from '../pages/restaurant/restaurant.container';
import { RestaurantProductDetailsContainer } from '../pages/restaurant/restaurant-product-details/restaurant-product-details.container';

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
				element={<Products />}
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

			<Route
				path="shopping-cart"
				element={<CartContainer />}
				loader={async () => {
					const [restaurantsProducts] = await Promise.all([restaurantProductsLoader(queryClient)]);
					return json({ restaurantsProducts });
				}}
			/>

			<Route path="checkout" loader={() => fetchTelegramUser()} element={<CheckoutContainer />} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
