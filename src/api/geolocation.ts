import { QueryClient } from '@tanstack/react-query';

import { apiRequest } from 'api/api';

export const getGeolocation = async () => {
	const ipKey = process.env.REACT_APP_GEO_API_KEY || '';

	try {
		return await apiRequest(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}`, 'GET', {});
	} catch (error) {
		console.log(error);
	}
};

export const geolocationQuery = () => {
	return {
		queryKey: ['geolocation'],
		queryFn: async () => {
			const geo = await getGeolocation();
			if (!geo) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return geo;
		},
		// cached for 1 hours
		cacheTime: 10000 * 60 * 60,
		staleTime: 10000 * 60 * 60,
	};
};

export const geolocationLoader = (queryClient: QueryClient) => async () => {
	const query = geolocationQuery();

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
