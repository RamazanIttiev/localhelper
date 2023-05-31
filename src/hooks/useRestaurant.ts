import { useCart } from './useCart';
import { useOutletContext, useParams } from 'react-router-dom';
import { AppData, RestaurantModel } from '../models/productModel';

export const useRestaurant = () => {
	const { cartProducts } = useCart();
	const { restaurantId } = useParams();
	const { restaurants } = useOutletContext<AppData>();

	const restaurant: RestaurantModel | undefined = restaurants.find(restaurant => restaurant.Title === restaurantId);

	const cartRestaurant: RestaurantModel | undefined = restaurants.find(restaurant => {
		if (cartProducts[0]?.Restaurant !== undefined) {
			return restaurant.Id === cartProducts[0].Restaurant[0];
		}
	});

	return {
		restaurant,
		restaurants,
		cartRestaurant,
	};
};
