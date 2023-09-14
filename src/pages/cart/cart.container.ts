import { createElement, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { getAirtableUrl } from 'utils/airtable';
import { getMappedCartList } from 'utils/cart';

import { fetchAirtableData } from 'api/api';

import { handleMainButton, removeMainButtonEvent, setMainButtonText, showMainButton } from 'actions/webApp-actions';

import { useShoppingCart } from 'context/cart.context';

import { Cart } from './cart.component';

interface RouteState {
	state: {
		flowId: string;
		restaurant: Restaurant;
	};
}

export const CartContainer = () => {
	const { categoryId } = useParams();

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
		navigate(`/food/${restaurant.title}/checkout`, {
			state: {
				flowId,
				cartList,
				restaurant,
			},
		});
	}, [cartList, flowId, navigate, restaurant]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Checkout');
		handleMainButton(navigateToCheckout);

		return () => {
			removeMainButtonEvent(navigateToCheckout);
		};
	}, [navigateToCheckout]);

	useEffect(() => {
		if (isCartEmpty) {
			navigate(-1);
		}
	}, [isCartEmpty, navigate]);

	return createElement(Cart, {
		cartList,
		restaurantTitle,
	});
};
