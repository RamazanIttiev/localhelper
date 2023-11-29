import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCartService } from 'pages/cart/domain/service/cart.service.ts';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';
import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { RestaurantItemDetails } from './restaurant-item-details.component.tsx';

interface RouteState {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly restaurantItem: RestaurantItem;
}

export const RestaurantItemDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RouteState = state;

	const navigate = useNavigate();
	const { isCartEmpty } = useCartService();

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
