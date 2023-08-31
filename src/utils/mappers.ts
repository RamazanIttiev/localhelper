import { RestaurantModel } from 'models/product.model';

import { isWorkingHour } from './restaurant';

export const mapRestaurants = (restaurants: RestaurantModel[] | undefined): RestaurantModel[] => {
	return restaurants
		? restaurants.map(restaurant => ({
				...restaurant,
				workingTime: `${restaurant?.openTime} - ${restaurant?.closeTime}`,
				isWorking: isWorkingHour(restaurant?.openTime, restaurant?.closeTime),
				workingStatus: isWorkingHour(restaurant?.openTime, restaurant?.closeTime) ? 'Opened' : 'Closed',
		  }))
		: [];
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
