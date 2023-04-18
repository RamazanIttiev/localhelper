import React from 'react';
import { Layout } from './Layout';
import { Products } from '../pages/products/products';
import { Categories } from '../pages/categories/categories';
import { loadProducts } from '../actions/reactRouterLoaders';
import { ServiceContainer } from '../components/service/service.container';
import { ServicesContainer } from '../pages/services/services.container';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ProductDetailsContainer } from '../pages/productDetails/productDetails.container';

export const Telegram = window.Telegram.WebApp;
export const TelegramUser = window.Telegram.initDataUnsafe?.user;
export const TelegramTheme = Telegram.themeParams !== undefined ? Telegram.themeParams : null;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Categories />} />
			<Route path=":categoryId" element={<Products />} loader={loadProducts} />

			<Route path="services/:categoryId" element={<ServicesContainer />} />
			<Route path="services/:categoryId/:serviceId" element={<ServiceContainer />} loader={loadProducts} />

			<Route path=":categoryId/:productId" element={<ProductDetailsContainer />} />
			<Route path="services/:categoryId/:serviceId/:productId" element={<ProductDetailsContainer />} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
