import { CategoryModel, ProductModel, RestaurantModel } from '../models/product.model';
import { isWorkingHour } from './restaurant';
import { isFood } from './typeGuard';

export const mapCategories = (
	products: ProductModel[],
	categories: Omit<CategoryModel, 'restaurant'>[],
): Omit<CategoryModel, 'restaurant'>[] => {
	return categories.map(category => {
		return {
			id: category.id,
			flow: category.flow,
			flowId: category.flowId,
			headerTitle: category.headerTitle,
			headerImage: category?.headerImage?.map(({ url }: { url: string }) => {
				return { url };
			}),
			products: products.filter(product => {
				return product.category?.includes(category?.id);
			}),
		};
	});
};

export const mapRestaurants = (products: ProductModel[], restaurants: RestaurantModel[]): RestaurantModel[] => {
	return restaurants.map(restaurant => ({
		...restaurant,
		products: products.filter(product => isFood(product) && product.restaurant?.[0] === restaurant.id),
		workingTime: `${restaurant?.openTime} - ${restaurant?.closeTime}`,
		isWorking: isWorkingHour(restaurant?.openTime, restaurant?.closeTime),
		workingStatus: isWorkingHour(restaurant?.openTime, restaurant?.closeTime) ? 'Opened' : 'Closed',
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
