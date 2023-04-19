import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ErrorType } from '../../models/error';
import { getAirtableView } from '../../utils/airtable';
import { useCart } from '../cart/hooks/useCart';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { useProducts } from '../products/hooks/useProducts';
import { handleMainButton, hideMainButton, setMainButtonText, showMainButton } from '../../actions/webApp-actions';
import { ProductModel } from '../../models/productModel';

export const ProductDetailsContainer = () => {
	const { state } = useLocation();

	const product: ProductModel = state;

	const { getProductFromCart } = useProducts();
	const { cartProducts, addToCart, removeFromCart } = useCart();
	const { productsRoute, isServiceRoute, isServiceDetailsRoute } = useReactRouter();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const order = useMemo(
		() => (isServiceRoute ? { order: product.title } : { itemName: product.title }),
		[isServiceRoute, product.title],
	);

	const idForBot = getAirtableView(productsRoute?.params.categoryId);

	useEffect(() => {
		if (!isServiceDetailsRoute) {
			showMainButton();
			setMainButtonText(`${product.price} Rs`);
			handleMainButton(() => handleOrder(idForBot, order, handleLoading, handleError));
		}

		return () => hideMainButton();
	}, [idForBot, isServiceDetailsRoute, order, product.price]);

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
