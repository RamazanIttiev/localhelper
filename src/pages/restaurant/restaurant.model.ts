import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

export interface Restaurant {
	id: string;
	title: string;
	contact: string;
	openTime: string;
	location: string;
	closeTime: string;
	category: string[];
	isWorking: boolean;
	coordinates: string;
	workingTime: string;
	workingStatus: string;
	image: { url: string }[];
	items: RestaurantItem[] | undefined;
}
