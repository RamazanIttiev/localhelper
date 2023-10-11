import { AirtableData, CategoryId, RestaurantId } from 'models/airtable.model';

import { isUserAgentTelegram } from './deviceInfo';

const getCategoryId = (categoryId: string | undefined): CategoryId | undefined => {
	if (categoryId) {
		switch (categoryId) {
			case 'food': {
				return 'recDXcCYkEWHS9VNg';
			}
			case 'transport': {
				return 'recimzeIfkcqmyUXU';
			}
			case 'rent': {
				return 'recwr0732WJ0uhaAb';
			}
			case 'flowers': {
				return 'recHrX5AdXBPd1xwZ';
			}
			case 'tours': {
				return 'recV5dpi4g6leX7c6';
			}
		}
	}
};

const getRestaurantId = (restaurantId: string | undefined): RestaurantId | undefined => {
	if (restaurantId) {
		switch (restaurantId) {
			case 'Swell Cafe': {
				return 'recLjSkSDRH76OSn7';
			}
			case 'Lucky Sausage': {
				return 'recDaTRCa0i6vXlMq';
			}
			case 'FoodCave': {
				return 'recMfHiZy6XIJ9B7W';
			}
			case 'Lost Paradise': {
				return 'receAwG5pK2w7PrzG';
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
		case 'Items':
			return (
				`${process.env.REACT_APP_AIRTABLE_URL}/Items?filterByFormula=AND(NOT({category}=BLANK()), {category}='${categoryTitle}')` ||
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
		case 'RestaurantItems':
			return (
				`${process.env.REACT_APP_AIRTABLE_URL}/Items?filterByFormula=AND(NOT({restaurant}=BLANK()), {restaurant}='${restaurant}')` ||
				''
			);
		case 'Feed':
			return `${process.env.REACT_APP_AIRTABLE_URL}/Feed` || '';
	}
};
