import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { RestaurantCheckoutModel } from 'pages/checkout/restaurant-checkout/rent-checkout.model';
import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { handleOrder } from 'actions/global-actions';
import {
	getTelegramUser,
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantCheckoutComponent } from './restaurant-checkout.component';

interface RouteState {
	state: {
		flowId: string;
		restaurant: Restaurant;
		cartList: RestaurantProduct[];
	};
}

export const RestaurantCheckoutContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();
	const tgUser = getTelegramUser();

	const flowId = state.flowId;
	const restaurant = state.restaurant;
	const cartList = state.cartList;

	const { getCartTotalAmount, getCartOrder, clearCart } = useShoppingCart();

	const cartOrder = getCartOrder(cartList);
	const cartTotalAmount = getCartTotalAmount(cartList);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RestaurantCheckoutModel>({ defaultValues: { userName: tgUser?.first_name } });

	const produceOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				placeTitle: restaurant?.title,
				placeNumber: restaurant?.contact,
				placeLocation: restaurant?.location,
				placeCoordinates: restaurant?.coordinates,
				order: cartOrder,
				orderTotal: cartTotalAmount,
				tgUserNick: tgUser?.username,
			},
			() => {
				console.log();
			},
			() => {
				console.log();
			},
		).then(response => {
			if (response?.ok) {
				clearCart();
				navigate(-1);
			}
		});
	}, [
		flowId,
		restaurant?.title,
		restaurant?.contact,
		restaurant?.location,
		restaurant?.coordinates,
		cartOrder,
		cartTotalAmount,
		tgUser?.username,
		clearCart,
		navigate,
	]);

	const onSubmit = useCallback(async () => {
		try {
			await handleSubmit(produceOrder)();
		} catch (error) {
			// Handle any errors that occur during form submission
			console.error('Error submitting form:', error);
		}
	}, [handleSubmit, produceOrder]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Order');

		handleMainButton(onSubmit);

		return () => {
			removeMainButtonEvent(onSubmit);
		};
	}, [onSubmit]);

	return (
		<RestaurantCheckoutComponent
			cartList={cartList}
			cartTotalAmount={cartTotalAmount}
			register={register}
			errors={errors}
			onSubmit={onSubmit}
			restaurantTitle={restaurant.title}
		/>
	);
};
