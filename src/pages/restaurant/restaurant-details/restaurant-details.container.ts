import { createElement, useCallback, useEffect, useMemo } from 'react';
import { RestaurantDetails } from './restaurant-details.component';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../../actions/webApp-actions';
import { handleOrder } from '../../../actions/global-actions';
import { useLocation } from 'react-router-dom';
import { RestaurantModel } from '../../../models/product.model';
import { RestaurantProductModel } from '../components/restaurant-product/restaurant-product.model';

interface RouteState {
	readonly flowId: string;
	readonly restaurant: RestaurantModel;
	readonly restaurantProduct: RestaurantProductModel;
}

export const RestaurantDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RouteState = state;

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const restaurant = useMemo(() => routeState.restaurant, [routeState.restaurant]);
	const restaurantProduct = useMemo(() => routeState.restaurantProduct, [routeState.restaurantProduct]);

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: restaurantProduct.title,
				placeNumber: restaurant.contact,
				placeCoordinates: restaurant.coordinates,
			},
			() => {
				console.log();
			},
			() => {
				console.log();
			},
		);
	}, [flowId, restaurant.contact, restaurant.coordinates, restaurantProduct.title]);

	useEffect(() => {
		showMainButton();
		handleMainButton(handleProductOrder);
		setMainButtonText(`${restaurantProduct.price} Rs`);

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [handleProductOrder, restaurantProduct.price]);

	return createElement(RestaurantDetails, {
		restaurant,
		restaurantProduct,
	});
};
