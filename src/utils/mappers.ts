import { ProductModel } from '../models/productModel';
import { FieldSet, Records } from 'airtable';

export const mapData = (airTableData: Records<FieldSet>) => {
	return airTableData.map(table => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const item: ProductModel = table.fields;

		const productDefault: ProductModel = {
			id: item.id,
			title: item.title,
			place: item.place,
			price: item.price,
			description: item.description,
			image:
				item.image &&
				item.image.map(({ url }: { url: string }) => {
					return { url, alt: item.title };
				}),
			tableName: table._table.name,
		};
		switch (table._table.name) {
			case 'food': {
				return {
					...productDefault,
					spicy: item.spicy,
					amount: item.amount,
					location: item.location,
					vegetarian: item.vegetarian,
				};
			}
			case 'rent': {
				return {
					...productDefault,
					tv: item.tv,
					ac: item.ac,
					wifi: item.wifi,
					pool: item.pool,
				};
			}
			case 'tours':
			case 'flowers':
			case 'transport': {
				return {
					...productDefault,
				};
			}
			case 'bonus':
			case 'exchange': {
				return {
					title: item.title,
					id: item.id,
				};
			}
		}
	});
};
