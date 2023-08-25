import { createElement, useCallback, useEffect } from 'react';
import { Cart } from './cart.component';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/cart.context';
import { RestaurantModel } from '../../models/product.model';
import { RestaurantProductModel } from '../restaurant/components/restaurant-product/restaurant-product.model';

export interface RouteState {
	state: {
		flowId: string;
		products: RestaurantProductModel[];
		restaurant: RestaurantModel;
	};
}

export const CartContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();

	const flowId = state.flowId;
	const products = state.products;
	const restaurant = state.restaurant;

	const { isCartEmpty, cartItems } = useShoppingCart();

	const cartList = products?.filter(product => {
		return cartItems.some(cartItem => {
			return cartItem.id === product.id;
		});
	});

	const navigateToCheckout = useCallback(() => {
		navigate('/checkout', {
			state: {
				...state,
				flowId,
				placeTitle: restaurant?.title,
				placeNumber: restaurant?.contact,
				placeLocation: restaurant?.location,
				placeCoordinates: restaurant?.coordinates,
			},
		});
	}, [navigate, state, restaurant, flowId]);

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
		restaurant,
		navigateToCheckout,
	});
};
