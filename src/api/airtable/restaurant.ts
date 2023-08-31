import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { mapRestaurant, mapRestaurants } from 'utils/mappers';

import { getAirtableUrl } from 'utils/airtable';

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
		staleTime: 10000 * 60 * 60 * 2,
	};
};

export const restaurantLoader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
	const restaurantId = params.restaurantId;

	const query = restaurantQuery(restaurantId);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const restaurantProductsQuery = (restaurant: string | undefined) => {
	const url = getAirtableUrl('RestaurantProducts', '', restaurant);

	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['restaurantProducts', restaurant],
		queryFn: async () => {
			const restaurantProducts = await fetchAirtableData('RestaurantProducts', url);
			if (!restaurantProducts) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return restaurantProducts;
		},
		// cached for 2 hours
		staleTime: 10000 * 60 * 60 * 2,
	};
};

export const restaurantProductsLoader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
	const restaurantId = params.restaurantId;

	const query = restaurantProductsQuery(restaurantId);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
