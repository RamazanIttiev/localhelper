import { getAirtableView } from '../utils/airtable';
import { mapData } from '../utils/mappers';
import { defer, LoaderFunctionArgs } from 'react-router-dom';

const fetchProducts = async (categoryId: string | undefined) => {
	const airtableView = getAirtableView(categoryId);

	const data = await fetch(`https://api.airtable.com/v0/appN5D5g87uz2gY2j/${categoryId}?view=${airtableView}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_PRIVATE_KEY}` || '',
		},
	});
	const airtableBase = await data.json();

	return mapData(airtableBase.records, categoryId);
};

export const loadProducts = async ({ params }: LoaderFunctionArgs) => {
	return defer({
		products: fetchProducts(params.categoryId),
	});
};

export const loadProductDetails = async ({ params }: LoaderFunctionArgs) => {
	return defer({
		products: await fetchProducts(params.categoryId),
	});
};
