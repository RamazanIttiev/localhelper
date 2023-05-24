import { defer } from 'react-router-dom';
import { mapCategories, mapRestaurants } from '../utils/mappers';
import { fetchAirtableData } from './global-actions';
import { fetchTelegramUser } from './webApp-actions';

const fetchAppData = async () => {
	const resolvedProducts = await fetchAirtableData('Products');
	const resolvedCategories = await fetchAirtableData('Categories');
	const resolvedRestaurants = await fetchAirtableData('Restaurants');

	return {
		resolvedCategories: mapCategories(
			resolvedProducts.records,
			resolvedCategories.records,
			resolvedRestaurants.records,
		),
		resolvedProducts: resolvedProducts.records,
		resolvedRestaurants: mapRestaurants(resolvedProducts.records, resolvedRestaurants.records),
	};
};

export const loadAppData = async () => {
	const appData = await fetchAppData();
	return defer({ appData });
};

export const loadUserData = () => {
	return fetchTelegramUser();
};
