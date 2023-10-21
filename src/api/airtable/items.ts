import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { getAirtableUrl } from 'utils/airtable';

import { fetchAirtableData } from 'api/api';

export const itemsQuery = (category: string | undefined) => {
	const url = getAirtableUrl('Items', category);

	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['items', category],
		queryFn: async () => {
			const items = await fetchAirtableData('Items', url);
			if (!items) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return items;
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