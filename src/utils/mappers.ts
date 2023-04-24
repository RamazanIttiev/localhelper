import { CategoryModel, DefaultProductModel, FoodModel, ProductModel, RentModel } from '../models/productModel';
import { FieldSet, Records } from 'airtable';

import transport from '../assets/bike-rent.jpg';

export const mapRecords1 = (airTableData: Records<FieldSet>, categoryId: string | undefined) => {
	return airTableData.map(table => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const item: ProductModel = table.fields;

		const isFoodModel = (item: ProductModel): item is FoodModel => !!item;
		const isRentModel = (item: ProductModel): item is RentModel => !!item;

		const productDefault: DefaultProductModel = {
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
			infoBadges: item.infoBadges?.map(facility => {
				switch (facility) {
					case 'ac': {
						return 'ac_unit';
					}
					case 'wifi': {
						return 'wifi';
					}
					case 'pool': {
						return 'pool';
					}
					case 'breakfast': {
						return 'restaurant';
					}
					case 'vegetarian': {
						return 'grass';
					}
					case 'spicy': {
						return 'local_fire_department';
					}
					default: {
						return '';
					}
				}
			}),
		};
		switch (categoryId) {
			case 'food':
				if (isFoodModel(item)) {
					return {
						...productDefault,
						spicy: item.spicy,
						amount: item.amount,
						location: item.location,
						vegetarian: item.vegetarian,
					};
				}
				break;
			case 'rent':
				if (isRentModel(item)) {
					return {
						...productDefault,
						tv: item.tv,
						ac: item.ac,
						wifi: item.wifi,
						pool: item.pool,
					};
				}
				break;
			case 'tours':
			case 'flowers':
			case 'transport':
				return {
					...productDefault,
				};

			case 'bonus':
			case 'exchange':
				return {
					title: item.title,
					id: item.id,
				};
			default:
				return item;
		}
	});
};

export const getProductPageData = (airTableData: Records<FieldSet>, categoryId: string | undefined) => {
	const products = mapRecords1(airTableData, categoryId);
	switch (categoryId) {
		case 'food': {
			return {
				title: categoryId,
				headerImage: transport,
				products,
			};
		}
		case 'rent': {
			return {
				title: categoryId,
				headerImage: transport,
				products,
			};
		}
		case 'tours':
		case 'flowers':
		case 'transport': {
			return {
				title: categoryId,
				headerImage: transport,
				products,
			};
		}
		case 'bonus':
		case 'exchange': {
			return {
				products,
			};
		}
	}
};

export const mapRecords = (records: { fields: CategoryModel | ProductModel }[]) => {
	return records.map(item => {
		return item.fields;
	});
};
