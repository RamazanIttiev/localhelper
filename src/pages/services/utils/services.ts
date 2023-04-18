import { bikes, restaurants } from '../services.mock';

export const getServicesRoute = (title: string) => {
	switch (title) {
		case 'Food':
			return `services/${title.toLowerCase()}`;
		case 'Transport':
			return `services/${title.toLowerCase()}`;
		default:
			return title.toLowerCase();
	}
};

export const getCurrentActivity = (categoryId: string | undefined) => {
	switch (categoryId) {
		case 'food':
			return restaurants;
		case 'transport':
			return bikes;
		default:
			return [];
	}
};
