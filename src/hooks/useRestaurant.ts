import { useOutletContext, useParams } from 'react-router-dom';
import { AppData, RestaurantModel } from '../models/productModel';
import { useShoppingCart } from '../context/cart.context';

export const useRestaurant = () => {
	const { cartItems } = useShoppingCart();
	const { restaurantId } = useParams();
	const { restaurants } = useOutletContext<AppData>();

	const restaurant: RestaurantModel | undefined = restaurants.find(restaurant => restaurant.title === restaurantId);

	const cartRestaurant: RestaurantModel | undefined = restaurants.find(restaurant => {
		if (cartItems[0]?.restaurant !== undefined) {
			return restaurant.id === cartItems[0].restaurant[0];
		}
	});

	return {
		restaurant,
		restaurants,
		cartRestaurant,
	};
};
