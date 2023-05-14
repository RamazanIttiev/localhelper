import React, { useCallback, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { Container, Grid } from '@mui/material';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductContainer } from '../../components/product/product.container';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { useNavigate } from 'react-router-dom';
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
import { LoaderButton } from '../../reactkit/loaderButton';

export const Products = () => {
	const navigate = useNavigate();
	const { isRestaurantRoute } = useReactRouter();
	const { products, flowId, category } = useCategory();
	const { removeFromCart, addToCart, cartProducts, isCartEmpty } = useCart();
	const { title, isWorking, coordinates, workingStatus, workingTime, location, headerImage, restaurantProducts } =
		useRestaurant();

	const navigateToCart = useCallback(
		() =>
			navigate('/restaurants/food/shopping-cart', {
				state: {
					flowId,
					restaurant: title,
					coordinates: coordinates,
				},
			}),
		[flowId, navigate, coordinates, title],
	);

	useEffect(() => {
		if (isRestaurantRoute && !isCartEmpty && isWorking) {
			showMainButton();
			setMainButtonText('Order');
			handleMainButton(navigateToCart);
		} else hideMainButton();

		return () => {
			removeMainButtonEvent(navigateToCart);
		};
	}, [isWorking, isRestaurantRoute, isCartEmpty, navigateToCart]);

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
									isRestaurantOpened={isWorking}
									removeFromCart={removeFromCart}
									amountButtonsVisible={isRestaurantRoute}
								/>
							</Grid>
						);
					})}
				</Grid>
				{!isCartEmpty && isRestaurantRoute && !isUserAgentTelegram && isWorking && (
					<LoaderButton isMainButton text={'Order'} handleClick={navigateToCart} />
				)}
			</Container>
		</>
	);
};
