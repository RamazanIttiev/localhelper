import { mapCategoryData } from '../utils/mappers';
import { AppData } from '../models/productModel';
import { useLocation, useMatch, useOutletContext } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();
	const route = useMatch('*');
	const productsRoute = useMatch('/:categoryId');

	const servicesRoute = useMatch('/services/:categoryId');
	const serviceRoute = useMatch('/services/:categoryId/:serviceId');

	const productDetailsRoute = useMatch('/:categoryId/:productId');
	const serviceDetailsRoute = useMatch('/services/:categoryId/:serviceId/:productId');

	const isProductsRoute = productsRoute?.pattern.path === '/:categoryId';
	const isServiceRoute = serviceRoute?.pattern.path === '/services/:categoryId/:serviceId';
	const isServiceDetailsRoute = serviceDetailsRoute?.pattern.path === '/services/:categoryId/:serviceId/:productId';

	const appData = useOutletContext<AppData>();
	const category = mapCategoryData(
		appData?.resolvedCategories?.find(category => {
			return (
				category.Flow.toLowerCase() === route?.params['*'] ||
				category.Flow.toLowerCase() === productsRoute?.params.categoryId ||
				category.Flow.toLowerCase() === serviceRoute?.params.categoryId ||
				category.Flow.toLowerCase() === servicesRoute?.params.categoryId ||
				category.Flow.toLowerCase() === productDetailsRoute?.params.categoryId ||
				category.Flow.toLowerCase() === serviceDetailsRoute?.params.categoryId
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
		servicesRoute,
		isServiceRoute,
		isProductsRoute,
		productDetailsRoute,
		isServiceDetailsRoute,
	};
};
