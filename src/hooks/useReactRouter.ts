import { useLocation, useMatch } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();
	const productsRoute = useMatch('/:categoryId');
	const servicesRoute = useMatch('/services/:categoryId');
	const serviceRoute = useMatch('/services/:categoryId/:serviceId');
	const serviceDetailsRoute = useMatch('/services/:categoryId/:serviceId/:productId');

	const isServiceRoute = serviceRoute?.pattern.path === '/services/:categoryId/:serviceId';
	const isServiceDetailsRoute = serviceDetailsRoute?.pattern.path === '/services/:categoryId/:serviceId/:productId';

	return {
		pathname,
		productsRoute,
		servicesRoute,
		isServiceRoute,
		isServiceDetailsRoute,
	};
};
