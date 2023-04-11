import React from 'react';
import { Layout } from './Layout';
import { Products } from '../pages/products/products';
import { Categories } from '../pages/categories/categories';
import { loadProductDetails, loadProducts } from '../actions/reactRouterLoaders';
import { ProductDetailsContainer } from '../pages/productDetails/productDetails.container';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

export const Telegram = window.Telegram;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Categories />} />
			<Route path=":categoryId" element={<Products />} loader={loadProducts} />
			<Route path=":categoryId/:productId" element={<ProductDetailsContainer />} loader={loadProductDetails} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
