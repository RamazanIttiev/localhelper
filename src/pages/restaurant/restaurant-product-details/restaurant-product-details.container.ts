import { createElement, useCallback, useEffect, useMemo } from 'react';
import { RestaurantProductDetails } from './restaurant-product-details.component';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../../actions/webApp-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { RestaurantModel } from '../../../models/product.model';
import { RestaurantProductModel } from '../restaurant-product/restaurant-product.model';
import { useShoppingCart } from '../../../context/cart.context';

interface RouteState {
	readonly flowId: string;
	readonly restaurant: RestaurantModel;
	readonly restaurantProduct: RestaurantProductModel;
}

export const RestaurantProductDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RouteState = state;

	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const restaurant = useMemo(() => routeState.restaurant, [routeState.restaurant]);
	const restaurantProduct = useMemo(() => routeState.restaurantProduct, [routeState.restaurantProduct]);

	const navigateToCart = useCallback(
		() =>
			navigate('/shopping-cart', {
				state: {
					flowId,
					restaurant,
				},
			}),
		[navigate, flowId, restaurant],
	);

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
