import { useCartService } from 'pages/cart/domain/service/cart.service.ts';
import { RestaurantItemCard } from 'pages/restaurant/restaurant-item/restaurant-item.component.tsx';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';
import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

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

	return <RestaurantItemCard restaurantItem={restaurantItem} restaurant={restaurant} flowId={flowId} />;
};
