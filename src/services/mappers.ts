import { ProductModel } from '../models/productModel';
import { FieldSet, Records } from 'airtable';

export const mapFoodData = (foodData: Records<FieldSet>) =>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	foodData.map(({ fields }: { fields: ProductModel }) => {
		return {
			id: fields.id,
			title: fields.title,
			image:
				fields.image &&
				fields.image.map(({ url }: { url: string }) => {
					return { url, alt: fields.title };
				}),
			place: fields.place,
			price: fields.price,
			description: fields.description,
		};
	});
