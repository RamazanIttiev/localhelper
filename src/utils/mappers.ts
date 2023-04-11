import { ProductModel } from '../pages/productDetails/models/productModel';
import { FieldSet, Records } from 'airtable';

export const mapData = (airTableData: Records<FieldSet>, categoryId: string | undefined) => {
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
