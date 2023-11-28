import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCartService } from 'pages/cart/domain/service/cart.service.ts';
import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';
import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';
import { TabValue, RestaurantFormFields } from './rent-checkout.model.ts';
import { RestaurantCheckoutComponent } from './restaurant-checkout.component.tsx';

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

	const [impactOccurred] = useHapticFeedback();
	const [orderMethod, setOrderMethod] = useState<string>(TabValue.DELIVERY);

	const { getTotalPrice, getCartOrder, clearCart } = useCartService();

	const cartOrder = getCartOrder(restaurantItems);
	const cartTotalAmount = getTotalPrice(restaurantItems);

	const { onSubmit, errors, register, isSubmitting, isSubmitSuccessful } = useBase(
		useForm<RestaurantFormFields>({ defaultValues: { userName: tgUser?.first_name } }),
		{ order: cartOrder, orderTotal: cartTotalAmount, tgUserNick: tgUser?.username },
	);

	const handleOrderMethod = (e: React.SyntheticEvent | null, newValue: string | number | null) => {
		impactOccurred('light');

		if (typeof newValue === 'string') {
			setOrderMethod(newValue);
		}
	};

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
				orderMethod={orderMethod}
				handleOrderMethod={handleOrderMethod}
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
