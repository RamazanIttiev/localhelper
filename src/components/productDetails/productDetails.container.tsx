import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { ErrorType } from '../../models/error';
import { useCart } from '../../pages/cart/hooks/useCart';
import { ProductModel } from '../../models/productModel';
import { getAirtableView } from '../../utils/airtable';
import { useProducts } from '../../pages/products/hooks/useProducts';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage } from '../../actions/global-actions';

export const ProductDetailsContainer = ({ product }: { product: ProductModel }) => {
	const { getProductFromCart } = useProducts();
	const { cartProducts, addToCart, removeFromCart } = useCart();
	const { productsRoute, isRestaurantRoute } = useReactRouter();

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

	const order = isRestaurantRoute ? { order: product.title } : { itemName: product.title };

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
				amountButtonsVisible={isRestaurantRoute}
			/>
		</Container>
	);
};
