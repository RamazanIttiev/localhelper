import { useLocation, useMatch } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();
	const productsRoute = useMatch('/:categoryId');
	const restaurantRoute = useMatch('/restaurants/:restaurantId');

	const isRestaurantRoute = restaurantRoute?.pattern.path === '/restaurants/:restaurantId';

	return {
		pathname,
		productsRoute,
		isRestaurantRoute,
	};
};
