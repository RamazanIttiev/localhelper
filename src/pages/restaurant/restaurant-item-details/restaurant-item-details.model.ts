import { RestaurantItem } from '../restaurant-item/restaurant-item.model';

export interface RestaurantItemDetails {
	flowId: string;
	restaurantTitle: string;
	isRestaurantWorking: boolean;
	restaurantItem: RestaurantItem;
}
