import { useCart } from './useCart';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { AppData, RestaurantModel } from '../models/productModel';

export const useRestaurant = () => {
	const { appData } = useRouteLoaderData('Layout') as { appData: AppData };
	const { cartProducts } = useCart();
	const params = useParams();

	const restaurant: RestaurantModel | undefined = appData.resolvedRestaurants.find(
		restaurant => restaurant.Title === params?.restaurantId,
	);

	const cartRestaurant: RestaurantModel | undefined = appData.resolvedRestaurants.find(restaurant => {
		if (cartProducts[0]?.Restaurants !== undefined) {
			return restaurant.Id === cartProducts[0].Restaurants[0];
		}
	});

	return {
		restaurant,
		cartRestaurant,
		restaurants: appData.resolvedRestaurants,
	};
};
