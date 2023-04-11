import React, { useEffect, useState } from 'react';
import { ErrorType } from '../../models/error';
import { useCart } from '../cart/hooks/useCart';
import { getAirtableView } from '../../utils/airtable';
import { useProducts } from '../products/hooks/useProducts';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage } from '../../actions/global-actions';
import { ProductModel } from './models/productModel';
import { airtableBase } from '../../app/App';
import { mapData } from '../../utils/mappers';

export const ProductDetailsContainer = () => {
	const { cartProducts, addToCart, removeFromCart } = useCart();
	const { productsRoute, productDetailsRoute } = useReactRouter();
	const { getProductFromCart, checkProductInCart, getProducts } = useProducts();
	const [products, setProducts] = useState<ProductModel[]>([]);

	useEffect(() => {
		productDetailsRoute?.params.categoryId &&
			airtableBase(productDetailsRoute?.params.categoryId)
				.select({
					view: getAirtableView(productDetailsRoute?.params.categoryId),
				})
				.eachPage(records => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					return setProducts(mapData(records));
				});
	}, [productDetailsRoute?.params.categoryId, getProducts]);

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const selectedProduct = products.find(item => {
		return item.title.toLowerCase() === productDetailsRoute?.params.productId;
	});

	console.log(products);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const productFromCart = getProductFromCart(cartProducts, selectedProduct);
	const isProductInCart = checkProductInCart(cartProducts, selectedProduct);

	const idForBot = getAirtableView(productsRoute?.params.categoryId);

	const handleLoading = (value: boolean) => setLoading(value);

	const handleError = (value: ErrorType) => setErrorState(value);

	const amountButtonsVisible =
		(productsRoute?.pathname === '/food' && isProductInCart) || productDetailsRoute?.params.productId !== undefined;

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
