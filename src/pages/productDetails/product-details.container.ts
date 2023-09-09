import { createElement, useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

import { ProductDetails } from './product-details.component';

interface RouteState {
	readonly flowId: string;
	readonly product: DefaultProductModel;
}

export const ProductDetailsContainer = () => {
	const navigate = useNavigate();

	const { state } = useLocation();
	const routeState: RouteState = state;
	console.log(location);
	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const product = useMemo(() => routeState.product, [routeState.product]);

	const handleClick = useCallback(() => {
		navigate(`checkout`, {
			state: {
				flowId,
				product,
			},
		});
	}, [flowId, navigate, product]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Order');
		handleMainButton(handleClick);

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleClick);
		};
	}, [handleClick]);

	return createElement(ProductDetails, { product });
};
