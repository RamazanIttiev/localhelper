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
		navigate('/checkout', {
			state: {
				...state,
			},
		});
	}, [navigate, state]);

	useEffect(() => {
		showMainButton();
		handleMainButton(navigateToCheckout);

		return () => {
			removeMainButtonEvent(navigateToCheckout);
		};
	}, [navigateToCheckout, navigate]);

	useEffect(() => {
		if (isCartEmpty) {
			navigate(-1);
		}
	}, [isCartEmpty, navigate]);

	useEffect(() => {
		setMainButtonText('Checkout');

		if (!state?.isRestaurantWorking) {
			setMainButtonText(`Working time - ${state?.isRestaurantWorking}`);
			disableMainButton();
		} else enableMainButton();

		return () => {
			enableMainButton();
		};
	}, [state?.isRestaurantWorking]);

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
