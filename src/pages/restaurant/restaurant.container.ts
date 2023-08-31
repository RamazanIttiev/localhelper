import { useQuery } from '@tanstack/react-query';
import { createElement, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CategoryModel, FoodModel, RestaurantModel } from 'models/product.model';

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

import { Restaurant } from './restaurant.component';

export const RestaurantContainer = () => {
	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();
	const { restaurantId, categoryId } = useParams();

	const { data: category } = useQuery<CategoryModel>(categoryQuery(categoryId));
	const { data: products } = useQuery<FoodModel[]>(restaurantProductsQuery(restaurantId));
	const { data: restaurant } = useQuery<RestaurantModel>(restaurantQuery(restaurantId));

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

	return createElement(Restaurant, { restaurant, products, flowId });
};
