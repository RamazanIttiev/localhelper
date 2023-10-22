import { useQuery } from '@tanstack/react-query';
import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useCartService } from 'pages/cart/domain/service/cart.service';
import { Category } from 'pages/categories/category.model';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { categoryQuery } from 'api/airtable/category';
import { restaurantItemsQuery, restaurantQuery } from 'api/airtable/restaurant';

import { RestaurantComponent } from './restaurant.component';

export const RestaurantContainer = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useCartService();
	const [impactOccurred] = useHapticFeedback();
	const { restaurantId, categoryId } = useParams();

	const { data: category } = useQuery<Category>(categoryQuery(categoryId));
	const { data: items } = useQuery<RestaurantItem[]>(restaurantItemsQuery(restaurantId));
	const { data: restaurant } = useQuery<Restaurant>(restaurantQuery(restaurantId));

	const flowId = category?.flowId || '';

	const navigateToCart = useCallback(() => {
		impactOccurred('light');
		navigate('/shopping-cart', {
			state: {
				flowId,
				item: restaurant,
			},
		});
	}, [impactOccurred, navigate, flowId, restaurant]);

	return (
		<>
			<RestaurantComponent flowId={flowId} restaurant={restaurant} items={items} />
			{!isCartEmpty && <MainButton text={'To Cart'} onClick={navigateToCart} />}
		</>
	);
};
