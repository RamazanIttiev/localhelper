import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';

export interface RestaurantItemDetails {
	flowId: string;
	restaurantTitle: string;
	isRestaurantWorking: boolean;
	restaurantItem: RestaurantItem;
}
