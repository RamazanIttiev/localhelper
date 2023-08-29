import { useLocation, useMatch } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();

	const restaurantRoute = useMatch('/:categoryId/restaurants/:restaurantId');
	const restaurantProductDetailsRoute = useMatch('/:categoryId/restaurants/:restaurantId/:productId');

	const isRestaurantRoute = restaurantRoute?.pattern.path === '/:categoryId/restaurants/:restaurantId';
	const isRestaurantProductDetailsRoute =
		restaurantProductDetailsRoute?.pattern.path === '/:categoryId/restaurants/:restaurantId/:productId';

	return {
		pathname,
		isRestaurantRoute,
		isRestaurantProductDetailsRoute,
	};
};
