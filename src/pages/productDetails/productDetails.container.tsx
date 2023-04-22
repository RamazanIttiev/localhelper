import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { ErrorType } from '../../models/error';
import { useLocation } from 'react-router-dom';
import { useCart } from '../cart/hooks/useCart';
import { getAirtableView } from '../../utils/airtable';
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
	const { productsRoute, isServiceDetailsRoute } = useReactRouter();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const order = { itemName: product.title };

	const idForBot = getAirtableView(productsRoute?.params.categoryId);

	const handleProductOrder = useCallback(() => {
		return handleOrder(idForBot, { itemName: product.title }, handleLoading, handleError);
	}, [idForBot, product.title]);

	useEffect(() => {
		if (!isServiceDetailsRoute) {
			showMainButton();
			setMainButtonText(`${product.price} Rs`);
			handleMainButton(handleProductOrder);
		}

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [handleProductOrder, idForBot, isServiceDetailsRoute, product.price, product.title]);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const productFromCart = getProductFromCart(cartProducts, product);

	const handleLoading = (value: boolean) => setLoading(value);

	const handleError = (value: ErrorType) => setErrorState(value);

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'xs'}>
			<ProductDetailsUI
				order={order}
				loading={loading}
				idForBot={idForBot}
				addToCart={addToCart}
				errorState={errorState}
				selectedProduct={product}
				handleError={handleError}
				handleLoading={handleLoading}
				removeFromCart={removeFromCart}
				productFromCart={productFromCart}
				amountButtonsVisible={isServiceDetailsRoute}
			/>
		</Container>
	);
};
