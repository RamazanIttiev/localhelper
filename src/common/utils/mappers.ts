import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { RESTGeoLocation, GeoLocation } from 'common/models/geolocation.model.ts';

import { isWorkingHour } from 'common/utils/restaurant.ts';

export const mapRestaurants = (restaurants: Restaurant[] | undefined): Restaurant[] => {
	return restaurants
		? restaurants.map(restaurant => ({
				...restaurant,
				workingTime: `${restaurant?.openTime} - ${restaurant?.closeTime}`,
				isWorking: isWorkingHour(restaurant?.openTime, restaurant?.closeTime),
				workingStatus: isWorkingHour(restaurant?.openTime, restaurant?.closeTime) ? 'Opened' : 'Closed',
		  }))
		: [];
};

export const mapRestaurant = (restaurant: Restaurant): Restaurant => {
	return {
		...restaurant,
		// items: items.filter(item => isFood(item) && item.restaurant?.[0] === restaurant.id),
		workingTime: `${restaurant?.openTime} - ${restaurant?.closeTime}`,
		isWorking: isWorkingHour(restaurant?.openTime, restaurant?.closeTime),
		workingStatus: isWorkingHour(restaurant?.openTime, restaurant?.closeTime) ? 'Opened' : 'Closed',
	};
};

export const mapRecords = (records: any[]) => {
	return records.map(item => item.fields);
};

export const mapGeolocation = (geolocation: RESTGeoLocation): GeoLocation => {
	if (typeof geolocation === 'string') {
		return geolocation;
	}
	return {
		userCountry: geolocation.country_code2,
	};
};
