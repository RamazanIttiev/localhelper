import { CategoryModel, ProductModel, RestaurantModel } from '../models/productModel';
import { isWorkingHour } from './restaurant';
import { isFood } from './typeGuard';

export const mapCategories = (
	products: ProductModel[],
	categories: Omit<CategoryModel, 'Restaurants'>[],
): Omit<CategoryModel, 'Restaurants'>[] => {
	return categories.map(category => {
		return {
			Id: category.Id,
			Flow: category.Flow,
			FlowId: category.FlowId,
			HeaderTitle: category.HeaderTitle,
			HeaderImage: category?.HeaderImage?.map(({ url }: { url: string }) => {
				return { url };
			}),
			Products: products.filter(product => {
				return product.Category?.includes(category?.Id);
			}),
		};
	});
};

export const mapRestaurants = (products: ProductModel[], restaurants: RestaurantModel[]): RestaurantModel[] => {
	return restaurants.map(restaurant => ({
		...restaurant,
		Products: products.filter(product => isFood(product) && product.Restaurant?.[0] === restaurant.Id),
		WorkingTime: `${restaurant?.OpenTime} - ${restaurant?.CloseTime}`,
		IsWorking: isWorkingHour(restaurant?.OpenTime, restaurant?.CloseTime),
		WorkingStatus: isWorkingHour(restaurant?.OpenTime, restaurant?.CloseTime) ? 'Opened' : 'Closed',
	}));
};

export const mapRecords = (records: any[]) => {
	return records.map(item => item.fields);
};

export const mapInfoBadges = (badge: string) => {
	switch (badge) {
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
		case 'tv': {
			return 'tv';
		}
	}
};
