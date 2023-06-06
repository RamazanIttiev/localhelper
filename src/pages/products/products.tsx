import React, { useCallback, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { ProductsHeader } from './productsHeader';
import { AppData, ProductModel } from '../../models/product.model';
import { LoaderButton } from '../../reactkit/loaderButton';
import { useReactRouter } from '../../hooks/useReactRouter';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { ProductContainer } from '../../components/product/product.container';
import { useShoppingCart } from '../../context/cart.context';
import { isCategoryData, isRestaurantData } from '../../utils/typeGuard';

export const Products = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();
	const { isRestaurantRoute } = useReactRouter();
	const { currentData, products } = useLoaderData() as AppData;

	const restaurant = isRestaurantData(currentData) ? currentData : null;
	const category = isCategoryData(currentData) ? currentData : null;

	const flowId = category?.flowId || '';

	const navigateToCart = useCallback(
		() =>
			navigate('/shopping-cart', {
				state: {
					flowId,
				},
			}),
		[navigate, flowId],
	);

	useEffect(() => {
		if (!isCartEmpty && isRestaurantRoute) {
			showMainButton();
			setMainButtonText('Order');
			handleMainButton(navigateToCart);
		} else hideMainButton();

		return () => {
			removeMainButtonEvent(navigateToCart);
		};
	}, [isRestaurantRoute, isCartEmpty, navigateToCart]);

	return (
		<>
			<ProductsHeader category={category} restaurant={restaurant} />
			<Container sx={{ pt: 2, pb: !isUserAgentTelegram ? '3rem' : null }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{products?.map((product: ProductModel) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<ProductContainer restaurant={restaurant} currentProduct={product} flowId={flowId} />
							</Grid>
						);
					})}
				</Grid>
				{!isCartEmpty && isRestaurantRoute && !isUserAgentTelegram && (
					<LoaderButton isMainButton text={'Order'} handleClick={navigateToCart} />
				)}
			</Container>
		</>
	);
};
