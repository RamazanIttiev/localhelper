import React from 'react';
import { Layout } from './Layout';
import { Products } from '../pages/products/products';
import { Categories } from '../pages/categories/categories';
import { loadProducts } from '../actions/reactRouterLoaders';
import { RestaurantContainer } from '../pages/restaurant/restaurant.container';
import { RestaurantsContainer } from '../pages/restaurants/restaurants.container';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

export const Telegram = window.Telegram;

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Categories />} />
			<Route path=":categoryId" element={<Products />} loader={loadProducts} />
			<Route path="restaurants" element={<RestaurantsContainer />} loader={loadProducts} />
			<Route path="restaurants/:restaurantId" element={<RestaurantContainer />} loader={loadProducts} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
