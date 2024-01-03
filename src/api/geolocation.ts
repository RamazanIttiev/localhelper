import { QueryClient } from '@tanstack/react-query';

import { mapGeolocation } from 'common/utils/mappers';

import { RESTGeoLocation } from 'common/models/geolocation.model';

import { apiRequest } from 'api/api';

export const getGeolocation = async (): Promise<RESTGeoLocation> => {
	const ipKey = process.env.REACT_APP_GEO_API_KEY || '';

	const errorMessage = 'Something went wrong. Please reload the app';

	try {
		const response = await apiRequest(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipKey}`, 'GET', {});
		return response.message ? errorMessage : response;
	} catch (error) {
		return errorMessage;
	}
};

export const geolocationQuery = () => {
	const lsGeoString: string | null = localStorage.getItem('geoLocation');

	return {
		queryKey: ['geoLocation', lsGeoString],
		queryFn: async () => {
			const geo = await getGeolocation();
			return mapGeolocation(geo);
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
