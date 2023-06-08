import { fetchAirtableData } from '../api';
import { QueryClient } from '@tanstack/react-query';
import { getAirtableUrl } from '../../utils/airtable';
import { LoaderFunctionArgs } from 'react-router-dom';

export const productsQuery = (category: string | undefined) => {
	const url = getAirtableUrl('Products', category);

	return {
		// second element is for correct switching between routes
		// query function depends on a variable categoryId, must be included in query key
		queryKey: ['products', category],
		queryFn: async () => {
			const products = await fetchAirtableData('Products', url);
			if (!products) {
				throw new Response('', {
					status: 404,
					statusText: 'Not Found',
				});
			}
			return products;
		},
		enabled: category !== 'food',
	};
};

export const productsLoader =
	(queryClient: QueryClient) =>
	async ({ params }: LoaderFunctionArgs) => {
		const categoryId = params.categoryId;

		const query = productsQuery(categoryId);

		return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
	};
