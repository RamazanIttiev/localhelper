import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCartService } from 'pages/cart/domain/service/cart.service';
import { Cart } from 'pages/cart/presentation/cart.component';
import { getMappedCartList } from 'pages/cart/presentation/utils/cart';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { getAirtableUrl } from 'common/utils/airtable';

import { fetchAirtableData } from 'api/api';

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
			<MainButton text={'Checkout'} onClick={navigateToCheckout} disabled={restaurantItems?.length === 0} />
		</>
	);
};
