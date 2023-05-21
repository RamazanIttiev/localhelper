import { useCallback, useEffect } from 'react';
import { CartUI } from './cart.component';
import { useCart } from '../../hooks/useCart';
import {
	disableMainButton,
	enableMainButton,
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const CartContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { addToCart, removeFromCart, cartProducts, isCartEmpty } = useCart();

	const navigateToCheckout = useCallback(() => {
		console.log('navigateToCheckout cart', navigateToCheckout);
		navigate('/checkout', {
			state: {
				...state,
			},
		});
	}, [navigate, state]);

	useEffect(() => {
		showMainButton();
		console.log('state?.isRestaurantWorking cart', state?.isRestaurantWorking);
		if (!state?.isRestaurantWorking) {
			removeMainButtonEvent(navigateToCheckout);
			disableMainButton(`Working time - ${state?.restaurantWorkingTime}`);
		} else {
			console.log('isRestaurantWorking cart');
			enableMainButton();
			setMainButtonText('Checkout');
			handleMainButton(navigateToCheckout);
		}

		return () => {
			enableMainButton();
			removeMainButtonEvent(navigateToCheckout);
		};
	}, [navigateToCheckout, navigate, state?.isRestaurantWorking, state?.restaurantWorkingTime]);

	useEffect(() => {
		if (isCartEmpty) {
			navigate(-1);
		}
	}, [isCartEmpty, navigate]);

	return (
		<Container maxWidth={'sm'} sx={{ pb: 5 }}>
			<CartUI
				addToCart={addToCart}
				cartProducts={cartProducts}
				removeFromCart={removeFromCart}
				restaurantTitle={state?.placeTitle}
				navigateToCheckout={navigateToCheckout}
				isRestaurantWorking={state?.isRestaurantWorking}
				restaurantWorkingTime={state?.restaurantWorkingTime}
			/>
		</Container>
	);
};
