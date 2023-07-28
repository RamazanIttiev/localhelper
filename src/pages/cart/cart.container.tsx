import { useCallback, useEffect, useMemo } from 'react';
import { CartUI } from './cart.component';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/cart.context';
import { RestaurantModel } from '../../models/product.model';
import { useMainButton } from '../../hooks/useMainButton';

interface RouteState {
	state: { flowId: string };
}

export const CartContainer = () => {
	const { state } = useLocation() as RouteState;
	const flowId = state.flowId || '';

	const { isCartEmpty } = useShoppingCart();
	const navigate = useNavigate();
	const cartRestaurant = useMemo(() => ({}), []) as RestaurantModel;

	const navigateToCheckout = useCallback(() => {
		navigate('/checkout', {
			state: {
				flowId,
				placeTitle: cartRestaurant?.title,
				placeNumber: cartRestaurant?.contact,
				placeLocation: cartRestaurant?.location,
				placeCoordinates: cartRestaurant?.coordinates,
			},
		});
	}, [navigate, flowId, cartRestaurant]);

	useMainButton({ handleClick: navigateToCheckout, buttonLabel: 'order' });

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
