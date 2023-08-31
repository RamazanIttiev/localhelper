import { createElement } from 'react';

import { FoodModel, RestaurantModel } from 'models/product.model';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantProductCard } from './restaurant-product.component';
import { RestaurantProductModel } from './restaurant-product.model';

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
		image: product.image,
		infoBadges: product.infoBadges,
		title: product.title.toLowerCase(),
	};

	return createElement(RestaurantProductCard, {
		flowId,
		restaurant,
		restaurantProduct,
	});
};
