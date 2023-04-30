import { mapCategoryData } from '../utils/mappers';
import { AppData } from '../models/productModel';
import { useLocation, useMatch, useOutletContext } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();
	const route = useMatch('*');
	const productsRoute = useMatch('/:categoryId');

	const restaurantsRoute = useMatch('/:categoryId/restaurants');
	const restaurantRoute = useMatch('/:categoryId/restaurants/:restaurantId');

	const productDetailsRoute = useMatch('/:categoryId/:productId');
	const restaurantDetailsRoute = useMatch('/:categoryId/restaurants/:restaurantId/:productId');

	const isProductsRoute = productsRoute?.pattern.path === '/:categoryId';
	const isRestaurantRoute = restaurantRoute?.pattern.path === '/:categoryId/restaurants/:restaurantId';
	const isRestaurantDetailsRoute =
		restaurantDetailsRoute?.pattern.path === '/:categoryId/restaurants/:restaurantId/:productId';

	const appData = useOutletContext<AppData>();
	const category = mapCategoryData(
		appData?.resolvedCategories?.find(category => {
			return (
				category.Flow.toLowerCase() === route?.params['*'] ||
				category.Flow.toLowerCase() === productsRoute?.params.categoryId ||
				category.Flow.toLowerCase() === restaurantRoute?.params.categoryId ||
				category.Flow.toLowerCase() === restaurantsRoute?.params.categoryId ||
				category.Flow.toLowerCase() === productDetailsRoute?.params.categoryId ||
				category.Flow.toLowerCase() === restaurantDetailsRoute?.params.categoryId
			);
		}),
		appData?.resolvedProducts,
	);

	const flowId = category.FlowId !== undefined ? category.FlowId : '';

	return {
		flowId,
		pathname,
		category,
		products: category?.Products,
		productsRoute,
		restaurantsRoute,
		isRestaurantRoute,
		isProductsRoute,
		productDetailsRoute,
		isRestaurantDetailsRoute,
	};
};
