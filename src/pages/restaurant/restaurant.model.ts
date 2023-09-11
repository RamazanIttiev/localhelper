import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';

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
	products: RestaurantProduct[] | undefined;
}
