import React, { useCallback, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { ProductsHeader } from './productsHeader';
import { useCategory } from '../../hooks/useCategory';
import { useRestaurant } from '../../hooks/useRestaurant';
import { ProductModel } from '../../models/productModel';
import { LoaderButton } from '../../reactkit/loaderButton';
import { useReactRouter } from '../../hooks/useReactRouter';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { ProductContainer } from '../../components/product/product.container';

export const Products = () => {
	const { isCartEmpty } = useCart();
	const navigate = useNavigate();
	const { isRestaurantRoute } = useReactRouter();
	const { restaurant } = useRestaurant();
	const { flowId, category } = useCategory();

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

	const renderProducts = category?.Products?.length !== 0 ? category?.Products : restaurant?.Products;

	return (
		<>
			<ProductsHeader restaurant={restaurant} category={category} />
			<Container sx={{ pt: 2, pb: !isUserAgentTelegram ? '3rem' : null }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{renderProducts?.map((product: ProductModel) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<ProductContainer
									flowId={flowId}
									product={product}
									amountButtonsVisible={isRestaurantRoute}
								/>
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
