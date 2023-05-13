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
	const sriLankaTime = new Date(new Date().setUTCHours(22, 15));

	const currentDay = sriLankaTime.getUTCDate();
	const currentMonth = sriLankaTime.getUTCMonth();
	const currentYear = sriLankaTime.getUTCFullYear();

	const [openHour, openMinute] = open ? open.split(':').map(Number) : [];
	const openDateTime = new Date(currentYear, currentMonth, currentDay, openHour, openMinute);

	const [closeHour, closeMinute] = close ? close.split(':').map(Number) : [];
	let closeDateTime = new Date(currentYear, currentMonth, currentDay, closeHour, closeMinute);

	if (closeHour < openHour) {
		closeDateTime = new Date(currentYear, currentMonth, currentDay + 1, closeHour, closeMinute);
	}

	return sriLankaTime >= openDateTime && sriLankaTime <= closeDateTime;
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
