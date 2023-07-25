import React from 'react';
import { Layout } from './Layout';
import { Products } from '../pages/products/products';
import { Categories } from '../pages/categories/categories';
import { RestaurantsContainer } from '../pages/restaurants/restaurants.container';
import { createBrowserRouter, createRoutesFromElements, json, Route, RouterProvider } from 'react-router-dom';
import { ProductDetailsContainer } from '../pages/productDetails/productDetails.container';
import { CheckoutContainer } from '../pages/checkout/checkout.container';
import { fetchTelegramUser } from '../actions/webApp-actions';
import { CartContainer } from '../pages/cart/cart.container';
import { categoryLoader } from '../api/airtable/category';
import { QueryClient } from '@tanstack/react-query';
import { productsLoader } from '../api/airtable/products';
import { restaurantLoader, restaurantProductsLoader, restaurantsLoader } from '../api/airtable/restaurant';
import { TransportCheckoutContainer } from '../pages/transportCheckout/transportCheckout.container';
import { ExchangeContainer } from '../pages/exchange/exchange.container';

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
				element={<RestaurantsContainer />}
				loader={() => restaurantsLoader(queryClient)}
			/>
			<Route
				path=":categoryId/restaurants/:restaurantId"
				element={<Products />}
				loader={async () => {
					const [restaurants, restaurantsProducts] = await Promise.all([
						restaurantLoader(queryClient),
						restaurantProductsLoader(queryClient),
					]);
					return json({ restaurants, restaurantsProducts });
				}}
			/>

			<Route path=":categoryId/:productId" element={<ProductDetailsContainer />} />
			<Route path=":categoryId/restaurants/:restaurantId/:productId" element={<ProductDetailsContainer />} />

			<Route path="exchange" element={<ExchangeContainer />} />

			<Route path="shopping-cart" element={<CartContainer />} />

			<Route path="checkout" loader={() => fetchTelegramUser()} element={<CheckoutContainer />} />

			<Route
				path="transport-checkout"
				loader={() => fetchTelegramUser()}
				element={<TransportCheckoutContainer />}
			/>
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
