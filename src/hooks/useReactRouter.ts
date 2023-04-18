import { useLocation, useMatch } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();
	const productsRoute = useMatch('/:categoryId');
	const servicesRoute = useMatch('/services/:categoryId');
	const serviceRoute = useMatch('/services/:categoryId/:serviceId');

	const isServiceRoute = serviceRoute?.pattern.path === '/services/:categoryId/:serviceId';

	return {
		pathname,
		productsRoute,
		servicesRoute,
		isServiceRoute,
	};
};
