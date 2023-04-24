import { defer } from 'react-router-dom';
import { mapRecords } from '../utils/mappers';

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

const fetchProductPage = async () => {
	const categories = await fetchData('https://api.airtable.com/v0/appN5D5g87uz2gY2j/Categories?view=CategoriesView');
	const products = await fetchData('https://api.airtable.com/v0/appN5D5g87uz2gY2j/Products?view=ProductsView');

	const resolvedCategories = await categories.json();
	const resolvedProducts = await products.json();

	return {
		resolvedCategories: mapRecords(resolvedCategories.records),
		resolvedProducts: mapRecords(resolvedProducts.records),
	};
};

export const loadProducts = async () => {
	const appData = fetchProductPage();
	return defer({ appData });
};
