import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { getAirtableUrl } from 'utils/airtable';
import { getMappedCartList } from 'utils/cart';

import { fetchAirtableData } from 'api/api';

import { setHaptic } from 'actions/webApp-actions';

import { useShoppingCart } from 'context/cart.context';

import { Cart } from './cart.component';

interface RouteState {
	state: {
		flowId: string;
		restaurant: Restaurant;
	};
}

export const CartContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();
	const { getCartRestaurant, isCartEmpty, cartItems } = useShoppingCart();

	const flowId = state.flowId;
	const restaurant = state.restaurant;

	const [restaurantProducts, setRestaurantProducts] = useState<RestaurantProduct[]>([]);

	const restaurantTitle = getCartRestaurant();
	const cartList = getMappedCartList(restaurantProducts, cartItems);

	useEffect(() => {
		const url = getAirtableUrl('RestaurantProducts', '', restaurantTitle);

		async function fetchData() {
			setRestaurantProducts(await fetchAirtableData('RestaurantProducts', url));
		}

		fetchData();

		return () => {
			setRestaurantProducts([]);
		};
	}, [restaurantTitle]);

	const navigateToCheckout = useCallback(() => {
		setHaptic('soft');
		navigate(`/food/${restaurant.title}/checkout`, {
			state: {
				flowId,
				cartList,
				restaurant,
			},
		});
	}, [cartList, flowId, navigate, restaurant]);

	useEffect(() => {
		if (isCartEmpty) {
			navigate(-1);
		}
	}, [isCartEmpty, navigate]);

	return (
		<>
			<Cart cartList={cartList} restaurantTitle={restaurant.title} />
			<MainButton text={'Checkout'} onClick={navigateToCheckout} />
		</>
	);
};
