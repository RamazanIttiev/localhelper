import { QueryClient } from '@tanstack/react-query';
import { LoaderFunctionArgs } from 'react-router-dom';

import { getAirtableUrl } from 'common/utils/airtable';

import { fetchAirtableData } from 'api/api';

export const categoryQuery = (category: string | undefined) => {
	const url = getAirtableUrl('Category', category);

	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['category', category],
		queryFn: async () => {
			const category = await fetchAirtableData('Category', url);
			if (!category) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return category;
		},
		// cached for 2 hours
		cacheTime: 10000 * 60 * 60 * 2,
		staleTime: 10000 * 60 * 60 * 2,
	};
};

export const categoryLoader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
	const categoryId = params.categoryId;

	const query = categoryQuery(categoryId);

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
