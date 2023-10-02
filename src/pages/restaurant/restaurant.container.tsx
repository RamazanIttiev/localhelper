import { useQuery } from '@tanstack/react-query';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Category } from 'pages/categories/category.model';
import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { categoryQuery } from 'api/airtable/category';
import { restaurantProductsQuery, restaurantQuery } from 'api/airtable/restaurant';

import { setHaptic } from 'actions/webApp-actions';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantComponent } from './restaurant.component';

export const RestaurantContainer = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();
	const { restaurantId, categoryId } = useParams();

	const { data: category } = useQuery<Category>(categoryQuery(categoryId));
	const { data: products } = useQuery<RestaurantProduct[]>(restaurantProductsQuery(restaurantId));
	const { data: restaurant } = useQuery<Restaurant>(restaurantQuery(restaurantId));

	const flowId = category?.flowId || '';

	const navigateToCart = useCallback(() => {
		setHaptic('soft');
		navigate('/shopping-cart', {
			state: {
				flowId,
				restaurant,
			},
		});
	}, [navigate, flowId, restaurant]);

	return (
		<>
			<RestaurantComponent flowId={flowId} restaurant={restaurant} products={products} />
			{!isCartEmpty && <MainButton text={'To Cart'} onClick={navigateToCart} />}
		</>
	);
};
