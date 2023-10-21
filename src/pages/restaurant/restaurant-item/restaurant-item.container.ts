import { createElement } from 'react';

import { Restaurant } from 'pages/restaurant/restaurant.model';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantItemCard } from './restaurant-item.component';
import { RestaurantItem } from './restaurant-item.model';

interface Props {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly item: RestaurantItem;
}

export const RestaurantItemContainer = ({ flowId, item, restaurant }: Props) => {
	const { getItemAmount } = useShoppingCart();

	const itemAmount = item ? getItemAmount(item.id) : 0;

	const { ...restaurantItem }: RestaurantItem = {
		id: item.id,
		amount: itemAmount,
		price: item.price,
		image: item.image,
		iconBadges: item.iconBadges,
		title: item.title.toLowerCase(),
	};

	return createElement(RestaurantItemCard, {
		flowId,
		restaurant,
		restaurantItem,
	});
};
