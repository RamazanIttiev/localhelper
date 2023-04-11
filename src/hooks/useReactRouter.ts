import { useLocation, useMatch } from 'react-router-dom';

export const useReactRouter = () => {
	const { pathname } = useLocation();
	const productsRoute = useMatch('/:categoryId');
	const productDetailsRoute = useMatch('/:categoryId/:productId');

	return {
		pathname,
		productsRoute,
		productDetailsRoute,
	};
};
