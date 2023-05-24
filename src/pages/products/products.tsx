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
import { Header } from './header';
import { useCategory } from '../../hooks/useCategory';
import { ProductModel } from '../../models/productModel';
import { useRestaurant } from '../../hooks/useRestaurant';
import { LoaderButton } from '../../reactkit/loaderButton';
import { useReactRouter } from '../../hooks/useReactRouter';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { ProductContainer } from '../../components/product/product.container';

export const Products = () => {
	const navigate = useNavigate();
	const { isRestaurantRoute } = useReactRouter();
	const { restaurant } = useRestaurant();
	const { flowId, category } = useCategory();
	const { removeFromCart, addToCart, cartProducts, isCartEmpty } = useCart();

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

	const renderHeader = {
		restaurantLocation: restaurant?.Location,
		restaurantWorkingTime: restaurant?.WorkingTime,
		restaurantWorkingStatus: restaurant?.WorkingStatus,
		title: category?.HeaderTitle || restaurant?.Title,
		image: (category?.HeaderImage !== undefined && category?.HeaderImage[0]?.url) || restaurant?.Image[0]?.url,
	};

	const renderProducts = category?.Products?.length !== 0 ? category?.Products : restaurant?.Products;

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
