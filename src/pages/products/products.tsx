import React, { useCallback, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { Container, Grid } from '@mui/material';
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
import { ProductModel, RestaurantModel } from '../../models/productModel';
import { useCategory } from '../../hooks/useCategory';
import { LoaderButton } from '../../reactkit/loaderButton';
import { useRestaurant } from '../../utils/restaurant';

export const Products = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { isRestaurantRoute } = useReactRouter();
	const { removeFromCart, addToCart, cartProducts, isCartEmpty } = useCart();
	const { isRestaurantWorking, restaurantWorkingTime, restaurantWorkingStatus } = useRestaurant();
	const { products, flowId, category } = useCategory();

	const restaurant: RestaurantModel | undefined = state?.restaurant;

	const navigateToCart = useCallback(
		() =>
			navigate('/shopping-cart', {
				state: {
					flowId,
					isRestaurantWorking,
					restaurantWorkingTime,
					placeTitle: restaurant?.Title,
					placeNumber: restaurant?.Contact,
					placeLocation: restaurant?.Location,
					placeCoordinates: restaurant?.Coordinates,
				},
			}),
		[
			navigate,
			flowId,
			isRestaurantWorking,
			restaurantWorkingTime,
			restaurant?.Title,
			restaurant?.Contact,
			restaurant?.Location,
			restaurant?.Coordinates,
		],
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
	}, [isRestaurantWorking, isRestaurantRoute, isCartEmpty, navigateToCart]);

	const renderHeader = {
		restaurantWorkingTime,
		restaurantWorkingStatus,
		restaurantLocation: restaurant?.Location,
		title: category?.HeaderTitle || restaurant?.Title,
		image: (category?.HeaderImage !== undefined && category?.HeaderImage[0]?.url) || restaurant?.Image[0]?.url,
	};

	const renderProducts = products?.length !== 0 ? products : restaurant?.Products;

	return (
		<>
			<Header {...renderHeader} />
			<Container sx={{ pt: 2, pb: !isUserAgentTelegram ? '3rem' : null }} maxWidth={'sm'}>
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
