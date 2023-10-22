import { MainButton } from '@vkruglikov/react-telegram-web-app';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCartService } from 'pages/cart/domain/service/cart.service';
import { useBase } from 'pages/checkout/hooks/checkout.hook';
import { RestaurantFormFields } from 'pages/checkout/restaurant-checkout/rent-checkout.model';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'theme/theme';

import { RestaurantCheckoutComponent } from './restaurant-checkout.component';

interface RouteState {
	state: {
		flowId: string;
		item?: Restaurant;
		cartList: RestaurantItem[];
	};
}

export const RestaurantCheckoutContainer = () => {
	const { state } = useLocation() as RouteState;
	const navigate = useNavigate();
	const tgUser = getTelegramUser();
	const restaurant = state?.item;
	const restaurantItems = state.cartList;

	const { getTotalPrice, getCartOrder, clearCart } = useCartService();

	const cartOrder = getCartOrder(restaurantItems);
	const cartTotalAmount = getTotalPrice(restaurantItems);

	const { onSubmit, errors, register, isSubmitting, isSubmitSuccessful } = useBase(
		useForm<RestaurantFormFields>({ defaultValues: { userName: tgUser?.first_name } }),
		{ order: cartOrder, orderTotal: cartTotalAmount, tgUserNick: tgUser?.username },
	);

	useEffect(() => {
		if (isSubmitSuccessful) {
			clearCart();
			navigate(-1);
		}
	}, [clearCart, isSubmitSuccessful, navigate]);

	return (
		<>
			<RestaurantCheckoutComponent
				cartList={restaurantItems}
				cartTotalAmount={cartTotalAmount}
				register={register}
				errors={errors}
				restaurantTitle={restaurant?.title}
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
