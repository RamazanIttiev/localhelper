import { useCallback, useEffect, useMemo } from 'react';
import { CartUI } from './cart.component';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/cart.context';
import { RestaurantModel } from '../../models/product.model';

interface CartState {
	state: { flowId: string };
}

export const CartContainer = () => {
	const { state }: CartState = useLocation();
	const { isCartEmpty } = useShoppingCart();
	const navigate = useNavigate();
	const cartRestaurant = useMemo(() => ({}), []) as RestaurantModel;

	const navigateToCheckout = useCallback(() => {
		navigate('/checkout', {
			state: {
				...state,
				placeTitle: cartRestaurant?.title,
				placeNumber: cartRestaurant?.contact,
				placeLocation: cartRestaurant?.location,
				placeCoordinates: cartRestaurant?.coordinates,
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
				navigateToCheckout={navigateToCheckout}
				restaurantTitle={cartRestaurant?.title}
				isRestaurantWorking={cartRestaurant?.isWorking}
				restaurantWorkingTime={cartRestaurant?.workingTime}
			/>
		</Container>
	);
};
