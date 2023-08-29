import { createElement, useCallback, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDetails } from './productDetails.component';
import { handleOrder } from '../../actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { DefaultProductModel } from '../../models/product.model';

interface RouteState {
	readonly flowId: string;
	readonly product: DefaultProductModel;
}

export const ProductDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RouteState = state;

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const product = useMemo(() => routeState.product, [routeState.product]);

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: product.title,
				placeNumber: product?.contact,
				placeCoordinates: product?.coordinates,
			},
			() => {
				console.log();
			},
			() => {
				console.log();
			},
		);
	}, [flowId, product.contact, product.coordinates, product.title]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Order');
		handleMainButton(handleProductOrder);

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [handleProductOrder]);

	return createElement(ProductDetails, { product });
};
