import { RestaurantProductModel } from '../restaurant-product/restaurant-product.model';

export interface RestaurantProductDetailsModel {
	flowId: string;
	restaurantTitle: string;
	isRestaurantWorking: boolean;
	restaurantProduct: RestaurantProductModel;
}
