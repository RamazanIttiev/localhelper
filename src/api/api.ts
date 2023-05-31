import { Telegram } from '../app/App';
import { UserData, UserDB } from '../models/userModel';
import { AppData, ProductModel } from '../models/productModel';
import { mapCategories, mapRecords, mapRestaurants } from '../utils/mappers';

type Tables = 'Products' | 'Categories' | 'Restaurants';
type METHODS = 'GET' | 'POST' | 'DELETE';

interface SendData {
	range: number[];
	scope: unknown;
	variables: { order: string; itemName?: undefined } | { itemName: string; order?: undefined } | undefined;
}

const findUser = (users: UserDB[]) => {
	return users.find(user => user.id === Telegram.initDataUnsafe.user?.id.toString());
};

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

const sendWebAppMessage = async (text: string) => {
	const url = process.env.REACT_APP_PROD_SERVER_URL || '';
	const headers = {};
	const body = {
		message: text,
		queryId: Telegram.initDataUnsafe.query_id,
	};

	return await apiRequest(url, 'POST', headers, body);
};

export const sendWebAppDeepLink = async (
	identifier: string,
	order: { order: string; itemName?: undefined } | { itemName: string; order?: undefined } | undefined,
) => {
	const url = process.env.REACT_APP_SMARTSENDER_URL || '';
	const headers = {
		'Content-type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	};

	const body: SendData = {
		range: [],
		scope: {},
		variables: order,
	};

	return await apiRequest(url, 'POST', headers, body).then(store => {
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		const encodedIdentifier = btoa(atob(identifier) + '|' + store.id).replace(/=/g, '');
		return sendWebAppMessage('/start ' + encodedIdentifier);
	});
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

export const fetchUser = async () => {
	const url = process.env.REACT_APP_POST_USERS_URL || '';

	const headers = {
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};

	const resolvedUsers = await apiRequest(url, 'GET', headers);

	return findUser(mapRecords(resolvedUsers.records));
};

export const saveUserInfo = async (userData: UserData) => {
	const { userAddress, userName, userHotel, userPhone } = userData;
	const url = process.env.REACT_APP_POST_USERS_URL || '';

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	};

	const body = {
		fields: {
			name: userName,
			hotel: userHotel,
			phone: userPhone,
			address: userAddress,
			id: Telegram.initDataUnsafe.user?.id.toString(),
		},
	};

	return await apiRequest(url, 'POST', headers, body);
};
