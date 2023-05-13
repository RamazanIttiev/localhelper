import { useCallback, useEffect, useState } from 'react';
import { CartUI } from './cart.component';
import { useCart } from '../../hooks/useCart';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { ErrorType } from '../../models/error';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearResponseMessage } from '../../actions/global-actions';
import { Container } from '@mui/material';

export const CartContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { addToCart, removeFromCart, cartProducts, isCartEmpty, cartTotalAmount, cartOrder } = useCart();

	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);
	const handleError = (value: ErrorType) => setErrorState(value);

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
				errorState={errorState}
				cartProducts={cartProducts}
				removeFromCart={removeFromCart}
				navigateToCheckout={navigateToCheckout}
				restaurantTitle={state?.restaurant !== undefined ? state.restaurant : undefined}
			/>
		</Container>
	);
};
