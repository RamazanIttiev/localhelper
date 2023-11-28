import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { GeoLocation } from 'common/models/geolocation.model.ts';

import { fetchAirtableData } from 'api/api.ts';

const getItemsFetchResult = ({
	category,
	geoLocation,
}: {
	category: string | undefined;
	geoLocation: GeoLocation | undefined;
}): Error | { url: string } => {
	if (typeof geoLocation !== 'string') {
		switch (category) {
			case 'bikes':
				return {
					url:
						`${
							import.meta.env.VITE_AIRTABLE_URL
						}/Items?filterByFormula=AND(NOT({category}=BLANK()), NOT({country}=BLANK()), 
					{category}='${category}', {country}='${geoLocation?.userCountry}')` || '',
				};
			default:
				return { url: '' };
		}
	} else return new Error(geoLocation);
};

export const itemsQuery = (category: string | undefined, geoLocation?: GeoLocation) => {
	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['items', category],
		queryFn: async () => {
			const itemsFetchResult = getItemsFetchResult({ category, geoLocation });

			if (itemsFetchResult instanceof Error) {
				return itemsFetchResult;
			}

			return await fetchAirtableData('Items', itemsFetchResult.url);
		},
		// cached for 2 hours
		cacheTime: 10000 * 60 * 60 * 2,
		staleTime: 10000 * 60 * 60 * 2,
	};
};

export const itemsLoader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
	const categoryId = params.categoryId;

	const query = itemsQuery(categoryId);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
