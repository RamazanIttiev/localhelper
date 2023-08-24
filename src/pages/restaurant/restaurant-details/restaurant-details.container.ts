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
import { RestaurantDetailsModel } from './restaurant-details.model';

export const RestaurantDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RestaurantDetailsModel = state;

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const restaurantTitle = useMemo(() => routeState.restaurantTitle, [routeState.restaurantTitle]);
	const restaurantProduct = useMemo(() => routeState.restaurantProduct, [routeState.restaurantProduct]);
	const isRestaurantWorking = useMemo(() => routeState.isRestaurantWorking, [routeState.isRestaurantWorking]);

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: restaurantProduct.title,
				// placeNumber: product?.contact,
				// placeCoordinates: product?.coordinates,
			},
			() => {
				console.log();
			},
			() => {
				console.log();
			},
		);
	}, [flowId, restaurantProduct.title]);

	useEffect(() => {
		showMainButton();
		handleMainButton(handleProductOrder);
		setMainButtonText(`${state?.price} Rs`);

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [handleProductOrder, state?.price]);

	return createElement(RestaurantDetails, {
		restaurantProduct,
		restaurantTitle,
		isRestaurantWorking,
	});
};
