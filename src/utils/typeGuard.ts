import { FoodModel, ProductModel } from '../models/product.model';

export const isFood = (product?: ProductModel): product is FoodModel => {
	return (product as FoodModel) !== undefined;
};
