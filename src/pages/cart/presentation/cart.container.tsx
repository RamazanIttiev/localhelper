import { useHapticFeedback, MainButton } from '@vkruglikov/react-telegram-web-app';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCartService } from 'pages/cart/domain/service/cart.service.ts';
import { Cart } from 'pages/cart/presentation/cart.component.tsx';
import { getMappedCartList } from 'pages/cart/presentation/utils/cart.ts';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';
import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { getAirtableUrl } from 'common/utils/airtable.ts';

import { fetchAirtableData } from 'api/api.ts';

interface RouteState {
	state: {
		flowId: string;
		item?: Restaurant;
	};
}

export const CartContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();
	const { getCartItems, getCartRestaurant, isCartEmpty } = useCartService();

	const [restaurantItems, setRestaurantItems] = useState<RestaurantItem[]>([]);

	const cartItems = getCartItems();
	const restaurantTitle = getCartRestaurant();
	const cartList = getMappedCartList(restaurantItems, cartItems);

	const [impactOccurred] = useHapticFeedback();

	const flowId = state.flowId;
	const restaurant = state?.item;

	useEffect(() => {
		const url = getAirtableUrl({ airtableData: 'RestaurantItems', restaurant: restaurantTitle });

		async function fetchData() {
			setRestaurantItems(await fetchAirtableData('RestaurantItems', url));
		}

		fetchData();

		return () => {
			setRestaurantItems([]);
		};
	}, [restaurantTitle]);

	const navigateToCheckout = useCallback(() => {
		impactOccurred('light');
		navigate(`/food/${restaurant?.title}/checkout`, {
			state: {
				flowId,
				cartList,
				item: restaurant,
			},
		});
	}, [cartList, flowId, impactOccurred, navigate, restaurant]);

	useEffect(() => {
		if (isCartEmpty) {
			navigate(-1);
		}
	}, [isCartEmpty, navigate]);

	return (
		<>
			<Cart cartList={cartList} restaurantTitle={restaurant?.title} />
			<MainButton text={'Checkout'} onClick={navigateToCheckout} disabled={restaurantItems?.length === 0} />
		</>
	);
};
