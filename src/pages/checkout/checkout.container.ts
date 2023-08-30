import React, { createElement, useCallback, useEffect, useState } from 'react';
import { handleOrder } from '../../actions/global-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useForm } from 'react-hook-form';
import { UserData, UserDB } from '../../models/user.model';
import { useShoppingCart } from '../../context/cart.context';
import { fetchUser, saveUserInfo } from '../../api/user';
import { RestaurantProductModel } from '../restaurant/restaurant-product/restaurant-product.model';
import { Checkout } from './checkout.component';
import { RestaurantModel } from '../../models/product.model';

interface RouteState {
	state: {
		flowId: string;
		restaurant: RestaurantModel;
		cartList: RestaurantProductModel[];
	};
}

export const CheckoutContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();

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
	} = useForm<UserData>();

	const [user, setUser] = useState<UserDB | undefined>();
	const [saveInfo, setSaveInfo] = useState(true);

	const handleSaveInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveInfo(event.target.checked);
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await fetchUser();
				setUser(user);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserData().catch(error => error);
	}, []);

	const produceOrder = useCallback(
		(userData?: UserData) => {
			return handleOrder(
				flowId,
				{
					placeTitle: restaurant?.title,
					placeNumber: restaurant?.contact,
					placeLocation: restaurant?.location,
					placeCoordinates: restaurant?.coordinates,
					...userData,
					order: cartOrder,
					orderTotal: cartTotalAmount,
				},
				() => {
					console.log();
				},
				() => {
					console.log();
				},
			).then(response => {
				if (response?.ok) {
					userData !== undefined && saveInfo && !user && saveUserInfo(userData);
					clearCart();
					navigate(-1);
				}
			});
		},
		[
			flowId,
			restaurant?.title,
			restaurant?.contact,
			restaurant?.location,
			restaurant?.coordinates,
			cartOrder,
			cartTotalAmount,
			saveInfo,
			user,
			clearCart,
			navigate,
		],
	);

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

	return createElement(Checkout, {
		cartList,
		cartTotalAmount,
		register,
		errors,
		onSubmit,
		saveInfo,
		handleSaveInfo,
		restaurantTitle: restaurant.title,
	});
};
