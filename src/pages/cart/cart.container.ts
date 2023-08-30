import { createElement, useCallback, useEffect, useState } from 'react';
import { Cart } from './cart.component';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/cart.context';
import { RestaurantProductModel } from '../restaurant/restaurant-product/restaurant-product.model';
import { getMappedCartList } from '../../utils/cart';
import { getAirtableUrl } from '../../utils/airtable';
import { fetchAirtableData } from '../../api/api';
import { RestaurantModel } from '../../models/product.model';

interface RouteState {
	state: {
		flowId: string;
		restaurant: RestaurantModel;
	};
}

export const CartContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();
	const { getCartRestaurant, isCartEmpty, cartItems } = useShoppingCart();

	const flowId = state.flowId;
	const restaurant = state.restaurant;

	const [restaurantProducts, setRestaurantProducts] = useState<RestaurantProductModel[]>([]);

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
		navigate('/checkout', {
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
