import { useCallback, useEffect } from 'react';
import { CartUI } from './cart.component';
import { useCart } from '../../hooks/useCart';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRestaurant } from '../../hooks/useRestaurant';

interface CartState {
	state: { flowId: string };
}

export const CartContainer = () => {
	const { state }: CartState = useLocation();
	const navigate = useNavigate();
	const { cartRestaurant } = useRestaurant();
	const { addToCart, removeFromCart, cartProducts, isCartEmpty } = useCart();

	const navigateToCheckout = useCallback(() => {
		navigate('/checkout', {
			state: {
				...state,
				placeTitle: cartRestaurant?.Title,
				placeNumber: cartRestaurant?.Contact,
				placeLocation: cartRestaurant?.Location,
				placeCoordinates: cartRestaurant?.Coordinates,
			},
		});
	}, [navigate, state, cartRestaurant]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Checkout');
		handleMainButton(navigateToCheckout);

		return () => {
			removeMainButtonEvent(navigateToCheckout);
		};
	}, [navigateToCheckout]);

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
				navigateToCheckout={navigateToCheckout}
				restaurantTitle={cartRestaurant?.Title}
				isRestaurantWorking={cartRestaurant?.IsWorking}
				restaurantWorkingTime={cartRestaurant?.WorkingTime}
			/>
		</Container>
	);
};
