import { useQuery } from '@tanstack/react-query';
import { createElement, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Category } from 'pages/categories/category.model';
import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { categoryQuery } from 'api/airtable/category';
import { restaurantProductsQuery, restaurantQuery } from 'api/airtable/restaurant';

import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

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

	const navigateToCart = useCallback(
		() =>
			navigate('/shopping-cart', {
				state: {
					flowId,
					restaurant,
				},
			}),
		[navigate, flowId, restaurant],
	);

	useEffect(() => {
		if (!isCartEmpty) {
			showMainButton();
			setMainButtonText('To Cart');
			handleMainButton(navigateToCart);
		} else hideMainButton();

		return () => {
			removeMainButtonEvent(navigateToCart);
		};
	}, [isCartEmpty, navigateToCart]);

	return createElement(RestaurantComponent, { restaurant, products, flowId });
};
