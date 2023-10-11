import { CartItem } from 'models/cart.model';

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

export const isSameRestaurant = (cartItems: CartItem[], restaurantTitle?: string) => {
	if (cartItems.length === 0) return true;

	return cartItems.some(item => {
		return item.restaurantTitle === restaurantTitle;
	});
};
