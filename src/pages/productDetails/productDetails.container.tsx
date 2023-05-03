import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { ErrorType } from '../../models/error';
import { useLocation } from 'react-router-dom';
import { useCart } from '../cart/hooks/useCart';
import { ProductModel } from '../../models/productModel';
import { useProducts } from '../products/hooks/useProducts';
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

export const ProductDetailsContainer = () => {
	const { state } = useLocation();
	const product: ProductModel = state;

	const { getProductFromCart } = useProducts();
	const { cartProducts, addToCart, removeFromCart } = useCart();
	const { flowId, isRestaurantDetailsRoute } = useReactRouter();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const isRestaurantOpened = state?.isRestaurantOpened;

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: product.title,
				coordinates: product.coordinates !== undefined ? product.coordinates : undefined,
				contactPlace: product.Contact !== undefined ? product.Contact : undefined,
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
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'xs'}>
			<ProductDetailsUI
				loading={loading}
				addToCart={addToCart}
				errorState={errorState}
				selectedProduct={product}
				removeFromCart={removeFromCart}
				productFromCart={productFromCart}
				handleProductOrder={handleProductOrder}
				isRestaurantOpened={isRestaurantOpened}
				amountButtonsVisible={isRestaurantDetailsRoute}
			/>
		</Container>
	);
};
