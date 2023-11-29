import { QueryClient } from '@tanstack/react-query';

import { getAirtableUrl } from 'common/utils/airtable.ts';

import { fetchAirtableData } from 'api/api.ts';

export const feedQuery = () => {
	const url = getAirtableUrl({ airtableData: 'Feed' });

	return {
		// second element is for correct switching between routes
		// query function depends on a variable feedId, must be included in query key
		queryKey: ['feed'],
		queryFn: async () => {
			const feed = await fetchAirtableData('Feed', url);
			if (!feed) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return feed;
		},
		// cached for 1 hours
		cacheTime: 10000 * 60 * 60,
		staleTime: 10000 * 60 * 60,
	};
};

export const feedLoader = (queryClient: QueryClient) => async () => {
	const query = feedQuery();

	return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};
