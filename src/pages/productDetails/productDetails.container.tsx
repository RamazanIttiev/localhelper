import React, { useEffect, useState } from 'react';
import { ErrorType } from '../../models/error';
import { useCart } from '../cart/hooks/useCart';
import { useLoaderData } from 'react-router-dom';
import { ProductModel } from './models/productModel';
import { getAirtableView } from '../../utils/airtable';
import { useProducts } from '../products/hooks/useProducts';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage } from '../../actions/global-actions';

export const ProductDetailsContainer = () => {
	const { getProductFromCart } = useProducts();
	const { cartProducts, addToCart, removeFromCart } = useCart();
	const { productsRoute, productDetailsRoute } = useReactRouter();
	const { products } = useLoaderData() as { products: ProductModel[] };

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const selectedProduct = products.find(item => {
		return item.title.toLowerCase() === productDetailsRoute?.params.productId;
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const productFromCart = getProductFromCart(cartProducts, selectedProduct);

	const idForBot = getAirtableView(productsRoute?.params.categoryId);

	const handleLoading = (value: boolean) => setLoading(value);

	const handleError = (value: ErrorType) => setErrorState(value);

	const amountButtonsVisible =
		productsRoute?.pathname === '/food' || productDetailsRoute?.params.categoryId === 'food';

	return (
		<ProductDetailsUI
			loading={loading}
			idForBot={idForBot}
			addToCart={addToCart}
			errorState={errorState}
			handleError={handleError}
			handleLoading={handleLoading}
			removeFromCart={removeFromCart}
			productFromCart={productFromCart}
			selectedProduct={selectedProduct}
			amountButtonsVisible={amountButtonsVisible}
		/>
	);
};
