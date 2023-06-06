import { apiRequest } from './api';
import { mapRecords, mapRestaurant, mapRestaurants } from '../utils/mappers';
import { AirtableData } from '../models/airtable.model';
import { getAirtableUrl } from '../utils/airtable';
import { CategoryModel, FoodModel, ProductModel, RestaurantModel } from '../models/product.model';

export const fetchAirtableData = async (airtableData: AirtableData, url: string) => {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};
	const resolvedData = await apiRequest(url, 'GET', headers);

	return resolvedData.records ? mapRecords(resolvedData.records) : resolvedData.fields;
};

export const resolveCategory = async (category: string): Promise<Omit<CategoryModel, 'restaurant'>> => {
	const url = getAirtableUrl('Category', category);

	return await fetchAirtableData('Category', url);
};

export const resolveProducts = async (category: string): Promise<ProductModel[]> => {
	const url = getAirtableUrl('Products', category);

	return await fetchAirtableData('Products', url);
};

export const resolveRestaurantProducts = async (restaurant: string): Promise<FoodModel[]> => {
	const url = getAirtableUrl('RestaurantProducts', '', restaurant);

	return await fetchAirtableData('RestaurantProducts', url);
};

export const resolveRestaurant = async (restaurant: string): Promise<RestaurantModel> => {
	const url = getAirtableUrl('Restaurant', '', restaurant);

	return mapRestaurant(await fetchAirtableData('Restaurant', url));
};

export const resolveRestaurants = async (): Promise<RestaurantModel[]> => {
	const url = getAirtableUrl('Restaurants');

	const restaurants = await fetchAirtableData('Restaurants', url);

	return mapRestaurants(restaurants);
};
