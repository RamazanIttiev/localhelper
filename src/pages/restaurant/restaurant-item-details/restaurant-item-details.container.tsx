import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Restaurant } from 'pages/restaurant/restaurant.model';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantItem } from '../restaurant-item/restaurant-item.model';
import { RestaurantItemDetails } from './restaurant-item-details.component';

interface RouteState {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly restaurantItem: RestaurantItem;
}

export const RestaurantItemDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RouteState = state;

	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();

	const [impactOccurred] = useHapticFeedback();

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const restaurant = useMemo(() => routeState.restaurant, [routeState.restaurant]);
	const restaurantItem = useMemo(() => routeState.restaurantItem, [routeState.restaurantItem]);

	const navigateToCart = useCallback(() => {
		impactOccurred('light');
		navigate('/shopping-cart', {
			state: {
				flowId,
				restaurant,
			},
		});
	}, [impactOccurred, navigate, flowId, restaurant]);

	return (
		<>
			<RestaurantItemDetails restaurantItem={restaurantItem} restaurant={restaurant} />
			{!isCartEmpty && <MainButton text={'To Cart'} onClick={navigateToCart} />}
		</>
	);
};
