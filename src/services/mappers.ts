import { ProductModel } from '../models/cardModel';
import { FieldSet, Records } from 'airtable';
import { v4 as uuidv4 } from 'uuid';

export const mapFoodData = (foodData: Records<FieldSet>) =>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	foodData.map(({ fields }: { fields: ProductModel }) => {
		return {
			id: uuidv4(),
			title: fields.title,
			image:
				fields.image &&
				fields.image.map(({ url, fileName }: { url: string; fileName: string }) => {
					return { url, fileName };
				}),
			place: fields.place,
			price: `${fields.price} Rs`,
			description: fields.description,
		};
	});
