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

export const useAirtableView = (tableTitle: string) => {
	switch (tableTitle) {
		case 'Food': {
			return 'ZGw6MTI0OTQ3';
		}
		default: {
			return 'ZGw6MTI0OTQ3';
		}
	}
};
