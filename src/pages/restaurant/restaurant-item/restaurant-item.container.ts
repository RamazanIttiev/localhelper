import { createElement } from 'react';

import { useCartService } from 'pages/cart/domain/service/cart.service';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { RestaurantItemCard } from './restaurant-item.component';
import { RestaurantItem } from './restaurant-item.model';

interface Props {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly item: RestaurantItem;
}

export const RestaurantItemContainer = ({ flowId, item, restaurant }: Props) => {
	const { getItemQuantity } = useCartService();

	const itemAmount = item ? getItemQuantity(item.id) : 0;

	const { ...restaurantItem }: RestaurantItem = {
		id: item.id,
		quantity: itemAmount,
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
