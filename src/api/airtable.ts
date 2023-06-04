import { mapCategories, mapRecords, mapRestaurants } from '../utils/mappers';
import { AppData, ProductModel } from '../models/product.model';
import { apiRequest } from './api';

type Tables = 'Products' | 'Categories' | 'Restaurants';

const getTableName = (table: Tables) => {
	switch (table) {
		case 'Categories':
			return process.env.REACT_APP_CATEGORIES_URL || '';
		case 'Products':
			return process.env.REACT_APP_PRODUCTS_URL || '';
		case 'Restaurants':
			return process.env.REACT_APP_RESTAURANTS_URL || '';
	}
};

const fetchAirtableData = async (table: Tables) => {
	const url = getTableName(table);

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};
	const resolvedData = await apiRequest(url, 'GET', headers);

	return mapRecords(resolvedData.records);
};

export const resolveAppData = async (): Promise<AppData> => {
	const resolvedProducts = await fetchAirtableData('Products');
	const resolvedCategories = await fetchAirtableData('Categories');
	const resolvedRestaurants = await fetchAirtableData('Restaurants');

	return {
		products: resolvedProducts as ProductModel[],
		categories: mapCategories(resolvedProducts, resolvedCategories),
		restaurants: mapRestaurants(resolvedProducts, resolvedRestaurants),
	};
};
