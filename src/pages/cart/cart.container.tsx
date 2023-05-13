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

export const CartContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { addToCart, removeFromCart, cartProducts, isCartEmpty, cartTotalAmount, cartOrder } = useCart();

	const navigateToCheckout = useCallback(() => {
		navigate('/checkout', {
			state: {
				flowId: state?.flowId,
				order: cartOrder,
				orderTotal: cartTotalAmount,
				restaurant: state?.restaurant,
				coordinates: state?.coordinates !== undefined ? state.coordinates : undefined,
			},
		});
	}, [cartOrder, cartTotalAmount, navigate, state?.restaurant, state.coordinates, state?.flowId]);

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
	}, []);

	return (
		<Container maxWidth={'sm'}>
			<CartUI
				addToCart={addToCart}
				cartProducts={cartProducts}
				removeFromCart={removeFromCart}
				navigateToCheckout={navigateToCheckout}
				restaurantTitle={state?.restaurant !== undefined ? state.restaurant : undefined}
			/>
		</Container>
	);
};
