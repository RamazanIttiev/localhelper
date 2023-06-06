import { isWorkingHour } from './restaurant';
import { RestaurantModel } from '../models/product.model';

export const mapRestaurants = (restaurants: RestaurantModel[]): RestaurantModel[] => {
	return restaurants.map(restaurant => ({
		...restaurant,
		// products: products.filter(product => isFood(product) && product.restaurant?.[0] === restaurant.id),
		workingTime: `${restaurant?.openTime} - ${restaurant?.closeTime}`,
		isWorking: isWorkingHour(restaurant?.openTime, restaurant?.closeTime),
		workingStatus: isWorkingHour(restaurant?.openTime, restaurant?.closeTime) ? 'Opened' : 'Closed',
	}));
};

export const mapRestaurant = (restaurant: RestaurantModel): RestaurantModel => {
	return {
		...restaurant,
		// products: products.filter(product => isFood(product) && product.restaurant?.[0] === restaurant.id),
		workingTime: `${restaurant?.openTime} - ${restaurant?.closeTime}`,
		isWorking: isWorkingHour(restaurant?.openTime, restaurant?.closeTime),
		workingStatus: isWorkingHour(restaurant?.openTime, restaurant?.closeTime) ? 'Opened' : 'Closed',
	};
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
