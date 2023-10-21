import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { getAirtableUrl } from 'utils/airtable';
import { getMappedCartList } from 'utils/cart';

import { fetchAirtableData } from 'api/api';

import { useShoppingCart } from 'context/cart.context';

import { Cart } from './cart.component';

interface RouteState {
	state: {
		flowId: string;
		item?: Restaurant;
	};
}

export const CartContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();
	const { getCartRestaurant, isCartEmpty, cartItems } = useShoppingCart();

	const [impactOccurred] = useHapticFeedback();

	const flowId = state.flowId;
	const restaurant = state?.item;

	const [restaurantItems, setRestaurantItems] = useState<RestaurantItem[]>([]);

	const restaurantTitle = getCartRestaurant();
	const cartList = getMappedCartList(restaurantItems, cartItems);

	useEffect(() => {
		const url = getAirtableUrl('RestaurantItems', '', restaurantTitle);

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
			<MainButton text={'Checkout'} onClick={navigateToCheckout} />
		</>
	);
};
