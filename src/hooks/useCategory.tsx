import { useLocation } from 'react-router-dom';

export const useCategory = () => {
	const { pathname } = useLocation();

	switch (pathname) {
		case '/categories/food': {
			return 'Food';
		}
		case '/categories/weed': {
			return 'Weed';
		}
		default: {
			return 'Food';
		}
	}
};
