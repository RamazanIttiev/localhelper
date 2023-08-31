import { AirtableData, CategoryId, RestaurantId } from 'models/airtable.model';

import { isUserAgentTelegram } from './deviceInfo';

const getCategoryId = (categoryId: string | undefined) => {
	if (categoryId) {
		switch (categoryId) {
			case 'food': {
				return CategoryId.FOOD;
			}
			case 'transport': {
				return CategoryId.TRANSPORT;
			}
			case 'rent': {
				return CategoryId.RENT;
			}
			case 'flowers': {
				return CategoryId.FLOWERS;
			}
			case 'tours': {
				return CategoryId.TOURS;
			}
		}
	}
};

const getRestaurantId = (restaurantId: string | undefined) => {
	if (restaurantId) {
		switch (restaurantId) {
			case 'Swell Cafe': {
				return RestaurantId.SwellCafe;
			}
			case 'Lucky Sausage': {
				return RestaurantId.LuckySausage;
			}
			case 'FoodCave': {
				return RestaurantId.FoodCave;
			}
			case 'Lost Paradise': {
				return RestaurantId.LostParadise;
			}
		}
	}
};

export const getAirtableUrl = (airtableData: AirtableData, category?: string, restaurant?: string) => {
	const categoryId = getCategoryId(category);
	const restaurantId = getRestaurantId(restaurant);
	const categoryTitle = `${category?.charAt(0).toUpperCase()}${category?.slice(1)}`;

	switch (airtableData) {
		case 'Category':
			return `${process.env.REACT_APP_AIRTABLE_URL}/Categories/${categoryId}` || '';
		case 'Products':
			return (
				`${process.env.REACT_APP_AIRTABLE_URL}/Products?filterByFormula=AND(NOT({category}=BLANK()), {category}='${categoryTitle}')` ||
				''
			);
		case 'Restaurants':
			return (
				`${process.env.REACT_APP_AIRTABLE_URL}/Restaurants${
					isUserAgentTelegram ? '?filterByFormula=isVisible' : ''
				}` || ''
			);
		case 'Restaurant':
			return `${process.env.REACT_APP_AIRTABLE_URL}/Restaurants/${restaurantId}` || '';
		case 'RestaurantProducts':
			return (
				`${process.env.REACT_APP_AIRTABLE_URL}/Products?filterByFormula=AND(NOT({restaurant}=BLANK()), {restaurant}='${restaurant}')` ||
				''
			);
	}
};
