import { RestaurantProduct } from '../restaurant-product/restaurant-product.model';

export interface RestaurantProductDetails {
	flowId: string;
	restaurantTitle: string;
	isRestaurantWorking: boolean;
	restaurantProduct: RestaurantProduct;
}
