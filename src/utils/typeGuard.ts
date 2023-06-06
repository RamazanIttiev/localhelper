import { CategoryModel, FoodModel, ProductModel, RestaurantModel } from '../models/product.model';

export const isFood = (product?: ProductModel): product is FoodModel => {
	return (product as FoodModel) !== undefined;
};

export const isCategoryData = (
	item?: Omit<CategoryModel, 'restaurant'> | RestaurantModel,
): item is Omit<CategoryModel, 'restaurant'> => {
	return (item as Omit<CategoryModel, 'restaurant'>) !== undefined;
};

export const isRestaurantData = (
	item?: Omit<CategoryModel, 'restaurant'> | RestaurantModel,
): item is RestaurantModel => {
	return (item as RestaurantModel) !== undefined;
};
