import { defer } from 'react-router-dom';
import { mapCategories } from '../utils/mappers';
import { fetchAirtableData } from './global-actions';

const fetchAppData = async () => {
	const resolvedProducts = await fetchAirtableData('Products');
	const resolvedCategories = await fetchAirtableData('Categories');
	const resolvedRestaurants = await fetchAirtableData('Restaurants');
	console.log(resolvedCategories);
	return {
		resolvedCategories: mapCategories(
			resolvedProducts.records,
			resolvedCategories.records,
			resolvedRestaurants.records,
		),
		resolvedProducts: resolvedProducts.records,
	};
};

export const loadAppData = async () => {
	const appData = fetchAppData();
	return defer({ appData });
};
