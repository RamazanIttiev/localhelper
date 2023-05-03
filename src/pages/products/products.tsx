import React, { useCallback, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { Button, Container, Grid, Typography } from '@mui/material';
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
import { Header } from './header';
import { ProductModel } from '../../models/productModel';
import { useRestaurant } from '../../utils/restaurant';
import { useCategory } from '../../hooks/useCategory';

export const Products = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { isRestaurantRoute } = useReactRouter();
	const { products, flowId, category } = useCategory();
	const { removeFromCart, addToCart, cartProducts, isCartEmpty } = useCart();
	const { title, isWorking, workingStatus, workingTime, location, headerImage, restaurantProducts } = useRestaurant();

	const navigateToCart = useCallback(
		() =>
			navigate('/restaurants/food/shopping-cart', {
				state: {
					flowId,
					restaurant: state?.Title !== undefined ? state.Title : undefined,
					coordinates: state?.Coordinates !== undefined ? state.Coordinates : undefined,
				},
			}),
		[flowId, navigate, state?.Coordinates, state?.Title],
	);

	useEffect(() => {
		if (isRestaurantRoute && !isCartEmpty) {
			showMainButton();
			setMainButtonText('Order');
			handleMainButton(navigateToCart);
		} else hideMainButton();

		return () => {
			removeMainButtonEvent(navigateToCart);
		};
	}, [isRestaurantRoute, isCartEmpty, navigateToCart]);

	const renderHeader = {
		location,
		workingTime,
		workingStatus,
		title: category?.HeaderTitle || title,
		image: (category?.HeaderImage !== undefined && category?.HeaderImage[0]?.url) || headerImage,
	};

	const renderProducts = products?.length !== 0 ? products : restaurantProducts;

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
									isRestaurantOpened={isWorking}
									removeFromCart={removeFromCart}
									amountButtonsVisible={isRestaurantRoute}
								/>
							</Grid>
						);
					})}
				</Grid>
				{!isCartEmpty && isRestaurantRoute && !isUserAgentTelegram && (
					<Button
						sx={{
							height: '36px',
							left: '50%',
							bottom: '1rem',
							width: '50%',
							position: 'fixed',
							transform: 'translate(-50%)',
						}}
						variant={'contained'}
						onClick={navigateToCart}>
						<Typography
							variant={'button'}
							sx={{
								fontWeight: '600',
								letterSpacing: '0.1rem',
							}}>
							Order
						</Typography>
					</Button>
				)}
			</Container>
		</>
	);
};
