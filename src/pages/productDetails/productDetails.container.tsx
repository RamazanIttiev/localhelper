import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ErrorType } from '../../models/error';
import { getAirtableView } from '../../utils/airtable';
import { useCart } from '../cart/hooks/useCart';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage } from '../../actions/global-actions';
import { useProducts } from '../products/hooks/useProducts';

export const ProductDetailsContainer = () => {
	const { state } = useLocation();
	const product = state;

	const { getProductFromCart } = useProducts();
	const { cartProducts, addToCart, removeFromCart } = useCart();
	const { productsRoute, isServiceRoute } = useReactRouter();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const productFromCart = getProductFromCart(cartProducts, product);

	const idForBot = getAirtableView(productsRoute?.params.categoryId);

	const handleLoading = (value: boolean) => setLoading(value);

	const handleError = (value: ErrorType) => setErrorState(value);

	const order = isServiceRoute ? { order: product.title } : { itemName: product.title };

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
				amountButtonsVisible={isServiceRoute}
			/>
		</Container>
	);
};
