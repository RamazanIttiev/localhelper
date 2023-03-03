import { useLocation } from 'react-router-dom';

export const useCategory = () => {
	const { pathname } = useLocation();

	switch (pathname) {
		case '/categories/food': {
			return 'Food';
		}
		case '/categories/flowers': {
			return 'Flowers';
		}
		case '/categories/rent': {
			return 'Rent';
		}
		case '/categories/tours': {
			return 'Tours';
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
		case 'Flowers': {
			return 'ZGw6MTI3MjY5';
		}
		case 'Rent': {
			return 'ZGw6MTI1Mjg2';
		}
		case 'Tours': {
			return 'ZGw6MTI5Mzc1';
		}
		default: {
			return 'ZGw6MTI0OTQ3';
		}
	}
};
