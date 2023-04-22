import { defer, LoaderFunctionArgs } from 'react-router-dom';

const urls = [
	'https://api.airtable.com/v0/appN5D5g87uz2gY2j/Categories?view=CategoriesView',
	'https://api.airtable.com/v0/appN5D5g87uz2gY2j/Products?view=ProductsView',
];

const fetchProductPage = async (categoryId: string | undefined) => {
	const requests = urls.map(url =>
		fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
			},
		}),
	);

	return Promise.all(requests).then(responses =>
		responses.forEach(response => {
			response.json().then(({ records }) => {
				return records;
			});
		}),
	);

	// const airtableView = getAirtableView(categoryId);
	//
	// const categories = await fetch(`https://api.airtable.com/v0/appN5D5g87uz2gY2j/Categories?view=CategoriesView`, {
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
	// 	},
	// });
	// const airtableCategories = await categories.json();
	// return mapRecords(airtableCategories.records, categoryId);
};

export const loadProducts = async ({ params }: LoaderFunctionArgs) => {
	return defer({
		productPageData: fetchProductPage(params.categoryId || 'food'),
	});
};
