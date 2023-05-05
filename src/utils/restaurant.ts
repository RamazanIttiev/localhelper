import { RestaurantModel } from '../models/productModel';
import { useParams } from 'react-router-dom';
import { useCategory } from '../hooks/useCategory';

export const getServicesRoute = (title: string) => {
	switch (title) {
		case 'Food':
			return `${title.toLowerCase()}/restaurants`;
		default:
			return title.toLowerCase();
	}
};

export const isWorkingHour = (open?: string, close?: string) => {
	const currentTime = new Date().toLocaleTimeString('it-IT', {
		timeZone: 'Asia/Colombo',
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
	});
	const [currentHour, currentMinute] = currentTime.split(':').map(Number);

	const currentTimeValue = currentHour + currentMinute / 60;
	const [openHour, openMinute] = open ? open.split(':').map(Number) : [];
	const openHourValue = openHour + openMinute / 60;

	const [closeHour, closeMinute] = close ? close.split(':').map(Number) : [];
	const closeHourValue = closeHour + closeMinute / 60;

	return currentTimeValue >= openHourValue && currentTimeValue < closeHourValue;
};

export const useRestaurant = (currentRestaurant?: RestaurantModel) => {
	const params = useParams();
	const { category } = useCategory();

	const restaurant: RestaurantModel | undefined =
		category.Restaurants?.find(restaurant => restaurant.Title === params?.restaurantId) || currentRestaurant;

	const isWorking = isWorkingHour(restaurant?.OpenTime, restaurant?.CloseTime);

	const workingStatus = isWorking ? 'Opened' : 'Closed';
	const workingTime = `${restaurant?.OpenTime} - ${restaurant?.CloseTime}`;
	const headerImage = restaurant?.Image !== undefined ? restaurant?.Image[0]?.url : '';

	return {
		workingTime,
		headerImage,
		workingStatus,
		title: restaurant?.Title,
		location: restaurant?.Location,
		coordinates: restaurant?.Coordinates,
		restaurantProducts: restaurant?.Products,
		isWorking: params?.categoryId === 'food' ? isWorking : true,
	};
};
