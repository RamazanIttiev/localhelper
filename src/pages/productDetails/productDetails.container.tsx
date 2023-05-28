import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { ErrorType } from '../../models/error';
import { useLocation } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { useProducts } from '../../hooks/useProducts';
import { ProductModel } from '../../models/productModel';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useRestaurant } from '../../hooks/useRestaurant';

export const ProductDetailsContainer = () => {
	const { state } = useLocation();
	const product: ProductModel = state;

	const { flowId } = useCategory();
	const { getProductFromCart } = useProducts();
	const { cartProducts } = useCart();
	const { isRestaurantDetailsRoute } = useReactRouter();
	const { restaurant } = useRestaurant();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: product.title,
				placeNumber: product?.Contact,
				placeCoordinates: product?.coordinates,
			},
			handleLoading,
			handleError,
		);
	}, [flowId, product.Contact, product.coordinates, product.title]);

	useEffect(() => {
		if (!isRestaurantDetailsRoute) {
			showMainButton();
			handleMainButton(handleProductOrder);
		} else hideMainButton();

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [handleProductOrder, isRestaurantDetailsRoute]);

	useEffect(() => {
		setMainButtonText(`${state?.price} Rs`);
	}, [state?.price]);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const productFromCart = getProductFromCart(cartProducts, product);

	const handleLoading = (value: boolean) => setLoading(value);

	const handleError = (value: ErrorType) => setErrorState(value);

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<ProductDetailsUI
				loading={loading}
				errorState={errorState}
				selectedProduct={product}
				productFromCart={productFromCart}
				handleProductOrder={handleProductOrder}
				isRestaurantWorking={restaurant?.IsWorking}
				amountButtonsVisible={isRestaurantDetailsRoute}
			/>
		</Container>
	);
};
