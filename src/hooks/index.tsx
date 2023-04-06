import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { airtableBase } from '../app/App';
import { mapData } from '../utils/mappers';
import { ProductModel } from '../models/productModel';

export const getAirtableView = (tableTitle: string | undefined) => {
	switch (tableTitle) {
		case 'food': {
			return 'ZGw6MTQ0NjE1';
		}
		case 'flowers': {
			return 'ZGw6MTI3MjY5';
		}
		case 'rent': {
			return 'ZGw6MTI1Mjg2';
		}
		case 'tours': {
			return 'ZGw6MTI5Mzc1';
		}
		case 'transport': {
			return 'ZGw6MTM2Nzcz';
		}
		default: {
			return 'ZGw6MTQ0NjE1';
		}
	}
};

export const useAirtableData = (categoryId: string | undefined) => {
	const { pathname } = useLocation();
	const airtableView = getAirtableView(categoryId);
	const [products, setProducts] = useState<ProductModel[]>([]);

	useEffect(() => {
		categoryId &&
			pathname !== '/' &&
			airtableBase(categoryId)
				.select({
					view: airtableView,
				})
				.eachPage(records => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return setProducts(mapData(records));
				});
	}, [categoryId, pathname, airtableView]);

	return products;
};
