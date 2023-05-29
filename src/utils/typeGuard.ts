import { FoodModel, ProductModel } from '../models/productModel';

export const isFood = (product?: ProductModel): product is FoodModel => {
	return (product as FoodModel) !== undefined;
};
