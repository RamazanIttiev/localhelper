import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useQuery } from '@tanstack/react-query';
import { ProductsHeader } from './productsHeader';
import { LoaderButton } from '../../reactkit/loaderButton';
import { useReactRouter } from '../../hooks/useReactRouter';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { useShoppingCart } from '../../context/cart.context';
import { ProductContainer } from '../../components/product/product.container';
import { CategoryModel, FoodModel, ProductModel, RestaurantModel } from '../../models/product.model';

import { categoryQuery } from '../../api/airtable/category';
import { productsQuery } from '../../api/airtable/products';
import { restaurantProductsQuery, restaurantQuery } from '../../api/airtable/restaurant';

export const Products = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();
	const { isRestaurantRoute } = useReactRouter();

	const { categoryId, restaurantId } = useParams();

	const { data: category } = useQuery<CategoryModel>(categoryQuery(categoryId));
	const { data: products } = useQuery<ProductModel[]>(productsQuery(categoryId));
	const { data: restaurant } = useQuery<RestaurantModel>(restaurantQuery(restaurantId));
	const { data: restaurantProducts } = useQuery<FoodModel[]>(restaurantProductsQuery(restaurantId));

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

	const renderProducts = products || restaurantProducts;

	return (
		<>
			<ProductsHeader category={category} restaurant={restaurant} />
			<Container sx={{ pt: 2, pb: !isUserAgentTelegram ? '3rem' : null }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{renderProducts?.map((product: ProductModel) => {
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
