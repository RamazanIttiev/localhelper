import { createElement, useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Restaurant } from 'pages/restaurant/restaurant.model';

import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setHaptic,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantProduct } from '../restaurant-product/restaurant-product.model';
import { RestaurantProductDetails } from './restaurant-product-details.component';

interface RouteState {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly restaurantProduct: RestaurantProduct;
}

export const RestaurantProductDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RouteState = state;

	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const restaurant = useMemo(() => routeState.restaurant, [routeState.restaurant]);
	const restaurantProduct = useMemo(() => routeState.restaurantProduct, [routeState.restaurantProduct]);

	const navigateToCart = useCallback(() => {
		setHaptic('soft');
		navigate('/shopping-cart', {
			state: {
				flowId,
				restaurant,
			},
		});
	}, [navigate, flowId, restaurant]);

	useEffect(() => {
		if (!isCartEmpty) {
			showMainButton();
			setMainButtonText('To Cart');
			handleMainButton(navigateToCart);
		} else hideMainButton();

		return () => {
			removeMainButtonEvent(navigateToCart);
		};
	}, [isCartEmpty, navigateToCart]);

	return createElement(RestaurantProductDetails, {
		restaurant,
		restaurantProduct,
	});
};
