import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { RestaurantCheckoutModel } from 'pages/checkout/restaurant-checkout/rent-checkout.model';
import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { useShoppingCart } from 'context/cart.context';

import { theme } from 'theme/theme';

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

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const flowId = state.flowId;
	const restaurant = state.restaurant;
	const cartList = state.cartList;

	const { getCartTotalAmount, getCartOrder, clearCart } = useShoppingCart();

	const cartOrder = getCartOrder(cartList);
	const cartTotalAmount = getCartTotalAmount(cartList);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RestaurantCheckoutModel>({ defaultValues: { userName: tgUser?.first_name } });

	const onSubmit = handleSubmit(
		() => {
			impactOccurred('light');
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
		},
		() => notificationOccurred('error'),
	);

	return (
		<>
			<RestaurantCheckoutComponent
				cartList={cartList}
				cartTotalAmount={cartTotalAmount}
				register={register}
				errors={errors}
				restaurantTitle={restaurant.title}
			/>
			<MainButton
				text={'Order'}
				onClick={onSubmit}
				disabled={isSubmitting}
				progress={isSubmitting}
				color={
					isSubmitting ? theme.tg_theme.palette.button_disabled_color : theme.tg_theme.palette.button_color
				}
			/>
		</>
	);
};
