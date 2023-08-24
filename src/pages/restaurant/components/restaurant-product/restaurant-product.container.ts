import { createElement } from 'react';
import { RestaurantProductCard } from './restaurant-product.component';
import { FoodModel, RestaurantModel } from '../../../../models/product.model';
import { RestaurantProductModel } from './restaurant-product.model';
import { useShoppingCart } from '../../../../context/cart.context';

interface Props {
	readonly flowId: string;
	readonly product: FoodModel;
	readonly restaurant: RestaurantModel;
}

export const RestaurantProductContainer = ({ flowId, product, restaurant }: Props) => {
	const { getItemAmount } = useShoppingCart();

	const productAmount = product ? getItemAmount(product.id) : 0;

	const { ...restaurantProduct }: RestaurantProductModel = {
		id: product.id,
		amount: productAmount,
		price: product.price,
		image: product.image[0].url,
		infoBadges: product.infoBadges,
		title: product.title.toLowerCase(),
	};

	const { isRestaurantWorking, restaurantTitle } = {
		isRestaurantWorking: restaurant.isWorking,
		restaurantTitle: restaurant.title,
	};

	return createElement(RestaurantProductCard, {
		flowId,
		restaurantProduct,
		isRestaurantWorking,
		restaurantTitle,
	});
};
