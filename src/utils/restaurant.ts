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
	const now = new Date();
	const sriLankaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Colombo', hour12: false }));

	const [openHour, openMinute] = open ? open.split(':').map(Number) : [];
	const openDateTime = new Date(
		sriLankaTime.getFullYear(),
		sriLankaTime.getMonth(),
		sriLankaTime.getDate(),
		openHour,
		openMinute,
	);

	const [closeHour, closeMinute] = close ? close.split(':').map(Number) : [];
	const closeDateTime = new Date(
		sriLankaTime.getFullYear(),
		sriLankaTime.getMonth(),
		sriLankaTime.getDate(),
		closeHour,
		closeMinute,
	);

	if (closeHour < openHour) {
		closeDateTime.setDate(closeDateTime.getDate() + 1);
	}

	return sriLankaTime >= openDateTime && sriLankaTime <= closeDateTime;
};

export const useRestaurant = (currentRestaurant?: RestaurantModel) => {
	const params = useParams();
	const { category } = useCategory();

	const restaurant: RestaurantModel | undefined =
		category.Restaurants?.find(restaurant => restaurant.Title === params?.restaurantId) || currentRestaurant;

	const isRestaurantWorking = isWorkingHour(restaurant?.OpenTime, restaurant?.CloseTime);

	const restaurantWorkingStatus = isRestaurantWorking ? 'Opened' : 'Closed';
	const restaurantWorkingTime = `${restaurant?.OpenTime} - ${restaurant?.CloseTime}`;

	return {
		isRestaurantWorking,
		restaurantWorkingTime,
		restaurantWorkingStatus,
	};
};
