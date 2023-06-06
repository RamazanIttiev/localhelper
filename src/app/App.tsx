import React from 'react';
import { Layout } from './Layout';
import { Products } from '../pages/products/products';
import { Categories } from '../pages/categories/categories';
import { RestaurantsContainer } from '../pages/restaurants/restaurants.container';
import { createBrowserRouter, createRoutesFromElements, defer, Route, RouterProvider } from 'react-router-dom';
import { ProductDetailsContainer } from '../pages/productDetails/productDetails.container';
import { CartContainer } from '../pages/cart/cart.container';
import { CheckoutContainer } from '../pages/checkout/checkout.container';
import {
	resolveCategory,
	resolveProducts,
	resolveRestaurant,
	resolveRestaurantProducts,
	resolveRestaurants,
} from '../api/airtable';
import { fetchTelegramUser } from '../actions/webApp-actions';

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
				loader={async ({ params }) => {
					const category = params.categoryId;

					if (category !== undefined) {
						return defer({
							currentData: await resolveCategory(category),
							products: await resolveProducts(category),
						});
					}
				}}
			/>

			<Route
				path=":categoryId/restaurants"
				element={<RestaurantsContainer />}
				loader={async () => defer({ restaurants: await resolveRestaurants() })}
			/>
			<Route
				path=":categoryId/restaurants/:restaurantId"
				element={<Products />}
				loader={async ({ params }) => {
					const restaurant = params.restaurantId;

					if (restaurant !== undefined) {
						return defer({
							currentData: await resolveRestaurant(restaurant),
							products: await resolveRestaurantProducts(restaurant),
						});
					}
				}}
			/>

			<Route path=":categoryId/:productId" element={<ProductDetailsContainer />} />
			<Route path=":categoryId/restaurants/:restaurantId/:productId" element={<ProductDetailsContainer />} />

			<Route path="shopping-cart" element={<CartContainer />} />

			<Route path="checkout" loader={() => fetchTelegramUser()} element={<CheckoutContainer />} />
		</Route>,
	),
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
