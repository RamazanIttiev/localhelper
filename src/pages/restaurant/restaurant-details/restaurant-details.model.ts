import { RestaurantProductModel } from '../components/restaurant-product/restaurant-product.model';

export interface RestaurantDetailsModel {
	flowId: string;
	restaurantTitle: string;
	isRestaurantWorking: boolean;
	restaurantProduct: RestaurantProductModel;
}
