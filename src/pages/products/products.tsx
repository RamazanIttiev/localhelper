import React, { useEffect } from 'react';
import { useCart } from '../cart/hooks/useCart';
import { Button, Container, Grid } from '@mui/material';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductContainer } from '../../components/product/product.container';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { ProductModel } from '../../models/productModel';
import { Header } from './header';

export const Products = () => {
	const { state } = useLocation();

	const navigate = useNavigate();
	const { products, flowId, category, isRestaurantRoute } = useReactRouter();
	const { removeFromCart, addToCart, cartProducts, isCartEmpty } = useCart();

	useEffect(() => {
		if (isRestaurantRoute && !isCartEmpty) {
			showMainButton();
			setMainButtonText('Order');
			handleMainButton(() =>
				navigate('/restaurants/food/shopping-cart', {
					state: {
						flowId,
						coordinates: state?.coordinates !== undefined ? state.coordinates : undefined,
					},
				}),
			);
		} else hideMainButton();

		return () => {
			hideMainButton();
			removeMainButtonEvent(() =>
				navigate('/restaurants/food/shopping-cart', {
					state: {
						flowId,
						coordinates: state?.coordinates !== undefined ? state.coordinates : undefined,
					},
				}),
			);
		};
	}, [isRestaurantRoute, isCartEmpty, navigate, flowId, state?.coordinates]);

	const renderHeader = {
		title: category?.HeaderTitle || state?.Title,
		location: state !== null ? state.Location : undefined,
		workingTime: state !== null ? state.workingTime : undefined,
		workingStatus: state !== null ? state.workingStatus : undefined,
		image: (category?.HeaderImage !== undefined && category?.HeaderImage[0]?.url) || state.Image[0].url,
	};

	const isRestaurantOpened = state === null ? true : state?.workingStatus === 'Opened';
	const renderProducts = products?.length !== 0 ? products : state !== null && state.Products;

	return (
		<>
			<Header {...renderHeader} />
			<Container sx={{ pt: 2 }} maxWidth={'md'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{renderProducts?.map((product: ProductModel) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<ProductContainer
									flowId={flowId}
									product={product}
									addToCart={addToCart}
									cartProducts={cartProducts}
									removeFromCart={removeFromCart}
									isRestaurantOpened={isRestaurantOpened}
									amountButtonsVisible={isRestaurantRoute}
								/>
							</Grid>
						);
					})}
				</Grid>
				{!isCartEmpty && isRestaurantRoute && !isUserAgentTelegram && (
					<Button
						sx={{
							left: '50%',
							bottom: '1rem',
							width: '50%',
							position: 'fixed',
							transform: 'translate(-50%)',
						}}
						variant={'contained'}
						onClick={() =>
							navigate('/restaurants/food/shopping-cart', {
								state: { flowId, coordinates: state !== null ? state.Coordinates : undefined },
							})
						}>
						Order
					</Button>
				)}
			</Container>
		</>
	);
};
