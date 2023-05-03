import { useLocation, useMatch } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();

	const productsRoute = useMatch('/:categoryId');
	const restaurantsRoute = useMatch('/:categoryId/restaurants');
	const restaurantRoute = useMatch('/:categoryId/restaurants/:restaurantId');

	const productDetailsRoute = useMatch('/:categoryId/:productId');
	const restaurantDetailsRoute = useMatch('/:categoryId/restaurants/:restaurantId/:productId');

	const isProductsRoute = productsRoute?.pattern.path === '/:categoryId';
	const isRestaurantRoute = restaurantRoute?.pattern.path === '/:categoryId/restaurants/:restaurantId';
	const isRestaurantDetailsRoute =
		restaurantDetailsRoute?.pattern.path === '/:categoryId/restaurants/:restaurantId/:productId';

	return {
		pathname,
		productsRoute,
		isProductsRoute,
		restaurantsRoute,
		isRestaurantRoute,
		productDetailsRoute,
		isRestaurantDetailsRoute,
	};
};
