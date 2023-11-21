import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { mapRestaurant, mapRestaurants } from 'common/utils/mappers';

import { getAirtableUrl } from 'common/utils/airtable';

import { fetchAirtableData } from 'api/api';

export const restaurantsQuery = (category: string | undefined) => {
	const url = getAirtableUrl('Restaurants');

	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['restaurants', category],
		queryFn: async () => {
			const restaurants = await fetchAirtableData('Restaurants', url);
			if (!restaurants) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return mapRestaurants(restaurants);
		},
		// cached for 2 hours
		cacheTime: 10000 * 60 * 60 * 2,
		staleTime: 10000 * 60 * 60 * 2,
	};
};

export const restaurantsLoader = (queryClient: QueryClient) => async (category: string | undefined) => {
	const query = restaurantsQuery(category);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const restaurantQuery = (restaurant: string | undefined) => {
	const url = getAirtableUrl('Restaurant', '', restaurant);

	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['restaurant', restaurant],
		queryFn: async () => {
			const restaurant = await fetchAirtableData('Restaurant', url);
			if (!restaurant) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return mapRestaurant(restaurant);
		},
		// cached for 2 hours
		cacheTime: 10000 * 60 * 60 * 2,
		staleTime: 10000 * 60 * 60 * 2,
	};
};

export const restaurantLoader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
	const restaurantId = params.restaurantId;

	const query = restaurantQuery(restaurantId);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const restaurantItemsQuery = (restaurant: string | undefined) => {
	const url = getAirtableUrl('RestaurantItems', '', restaurant);

	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['restaurantItems', restaurant],
		queryFn: async () => {
			const restaurantItems = await fetchAirtableData('RestaurantItems', url);
			if (!restaurantItems) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return restaurantItems;
		},
		// cached for 2 hours
		cacheTime: 10000 * 60 * 60 * 2,
		staleTime: 10000 * 60 * 60 * 2,
	};
};

export const restaurantItemsLoader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
	const restaurantId = params.restaurantId;

	const query = restaurantItemsQuery(restaurantId);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
