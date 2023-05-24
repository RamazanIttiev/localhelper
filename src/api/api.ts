import { UserData } from '../models/userModel';
import { AppData, ProductModel } from '../models/productModel';
import { mapCategories, mapRecords, mapRestaurants } from '../utils/mappers';

type Tables = 'Products' | 'Categories' | 'Restaurants';
type METHODS = 'GET' | 'POST' | 'DELETE';

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

const apiRequest = async (url: string, method: METHODS, headers: Record<string, string>, body?: any) => {
	try {
		const response = await fetch(url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			throw new Error('API request failed.');
		}

		return await response.json();
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`API request failed: ${error.message}`);
		}
	}
};

export const fetchAirtableData = async (table: Tables) => {
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

export const saveUserInfo = async (userData: UserData) => {
	const { userAddress, userName, userHotel, userPhone } = userData;
	const url = process.env.REACT_APP_USERS_URL || '';

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};

	const body = {
		fields: {
			Name: userName,
			Hotel: userHotel,
			Phone: userPhone,
			Address: userAddress,
		},
	};

	return await apiRequest(url, 'POST', headers, body);
};
