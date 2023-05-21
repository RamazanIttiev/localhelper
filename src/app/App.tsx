import React from 'react';
import { Layout } from './Layout';
import { Products } from '../pages/products/products';
import { Categories } from '../pages/categories/categories';
import { fetchUserData, loadAppData } from '../actions/reactRouterLoaders';
import { RestaurantsContainer } from '../pages/restaurants/restaurants.container';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ProductDetailsContainer } from '../pages/productDetails/productDetails.container';
import { CartContainer } from '../pages/cart/cart.container';
import { CheckoutContainer } from '../pages/checkout/checkout.container';

export const Telegram = window.Telegram.WebApp;
export const TelegramUser = window.Telegram.initDataUnsafe?.user;
export const TelegramTheme = Telegram.themeParams !== undefined ? Telegram.themeParams : null;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} loader={loadAppData} id={'Layout'}>
			<Route index element={<Categories />} />
			<Route path=":categoryId" element={<Products />} />

			<Route path=":categoryId/restaurants" element={<RestaurantsContainer />} />
			<Route path=":categoryId/restaurants/:restaurantId" element={<Products />} />

			<Route path=":categoryId/:productId" element={<ProductDetailsContainer />} />
			<Route path=":categoryId/restaurants/:restaurantId/:productId" element={<ProductDetailsContainer />} />

			<Route path="shopping-cart" element={<CartContainer />} />

			<Route path="checkout" loader={fetchUserData} element={<CheckoutContainer />} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
