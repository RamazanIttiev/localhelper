import { defer } from 'react-router-dom';
import { mapCategories } from '../utils/mappers';

const fetchData = async (
	url: string,
	options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
		},
	},
) => {
	return fetch(url, options);
};

const fetchAppData = async () => {
	const categories = await fetchData('https://api.airtable.com/v0/appN5D5g87uz2gY2j/Categories?view=CategoriesView');
	const products = await fetchData('https://api.airtable.com/v0/appN5D5g87uz2gY2j/Products?view=ProductsView');
	const restaurants = await fetchData(
		'https://api.airtable.com/v0/appN5D5g87uz2gY2j/Restaurants?view=RestaurantsView',
	);

	const resolvedCategories = await categories.json();
	const resolvedProducts = await products.json();
	const resolvedRestaurants = await restaurants.json();

	return {
		resolvedCategories: mapCategories(
			resolvedCategories.records,
			resolvedProducts.records,
			resolvedRestaurants.records,
		),
		resolvedProducts: resolvedProducts.records,
	};
};

export const loadAppData = async () => {
	const appData = fetchAppData();
	return defer({ appData });
};
