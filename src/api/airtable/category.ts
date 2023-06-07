import { fetchAirtableData } from '../api';
import { QueryClient } from '@tanstack/react-query';
import { getAirtableUrl } from '../../utils/airtable';
import { LoaderFunctionArgs } from 'react-router-dom';

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
		enabled: category !== 'food',
	};
};

export const categoryLoader =
	(queryClient: QueryClient) =>
	async ({ params }: LoaderFunctionArgs) => {
		const categoryId = params.categoryId;

		const query = categoryQuery(categoryId);

		return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
	};
