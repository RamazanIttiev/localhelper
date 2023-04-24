import { useLocation, useMatch, useOutletContext } from 'react-router-dom';
import { AppData } from '../models/productModel';

export const useReactRouter = () => {
	const { pathname } = useLocation();
	const productsRoute = useMatch('/:categoryId');
	const servicesRoute = useMatch('/services/:categoryId');
	const serviceRoute = useMatch('/services/:categoryId/:serviceId');
	const productDetailsRoute = useMatch('/:categoryId/:productId');
	const serviceDetailsRoute = useMatch('/services/:categoryId/:serviceId/:productId');

	const isProductsRoute = productsRoute?.pattern.path === '/:categoryId';
	const isServiceRoute = serviceRoute?.pattern.path === '/services/:categoryId/:serviceId';
	const isServiceDetailsRoute = serviceDetailsRoute?.pattern.path === '/services/:categoryId/:serviceId/:productId';

	const appData = useOutletContext<AppData>();

	const category = appData?.resolvedCategories?.find(category => {
		return (
			category.Flow.toLowerCase() === productsRoute?.params.categoryId ||
			category.Flow.toLowerCase() === productDetailsRoute?.params.categoryId ||
			category.Flow.toLowerCase() === serviceRoute?.params.categoryId
		);
	});

	const products = appData?.resolvedProducts?.filter(product => {
		return product.Category !== undefined && category !== undefined && product.Category.includes(category.Id);
	});

	const flowId = category !== undefined ? category.FlowId : '';

	return {
		flowId,
		pathname,
		products,
		productsRoute,
		servicesRoute,
		isServiceRoute,
		isProductsRoute,
		productDetailsRoute,
		isServiceDetailsRoute,
	};
};
