import { createElement } from 'react';

import { Restaurant } from 'pages/restaurant/restaurant.model';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantProductCard } from './restaurant-product.component';
import { RestaurantProduct } from './restaurant-product.model';

interface Props {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly product: RestaurantProduct;
}

export const RestaurantProductContainer = ({ flowId, product, restaurant }: Props) => {
	const { getItemAmount } = useShoppingCart();

	const productAmount = product ? getItemAmount(product.id) : 0;

	const { ...restaurantProduct }: RestaurantProduct = {
		id: product.id,
		amount: productAmount,
		price: product.price,
		image: product.image,
		iconBadges: product.iconBadges,
		title: product.title.toLowerCase(),
	};

	return createElement(RestaurantProductCard, {
		flowId,
		restaurant,
		restaurantProduct,
	});
};
