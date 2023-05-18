import React, { useCallback, useEffect, useState } from 'react';
import { FormUI } from './components/form.component';
import { Container, Switch, useTheme } from '@mui/material';
import { OrderInfo } from './components/orderInfo';
import { SaveInfoField, SaveInfoWrapper } from './checkout.styled';
import { ErrorType } from '../../models/error';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FormGroupTitle } from './components/formGroupTitle';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useForm } from 'react-hook-form';
import { CartList } from '../cart/cart-list';

export interface FormInput {
	userName: string;
	userPhone: string;
	userHotel: string;
	userAddress: string;
}

export const CheckoutContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const theme = useTheme();
	const { cartTotalAmount, cartOrder, clearCart, orderCheckout } = useCart();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInput>();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const produceOrder = useCallback(
		(formData?: FormInput) => {
			return handleOrder(
				state?.flowId,
				{
					...formData,
					order: cartOrder,
					orderTotal: cartTotalAmount,
					placeTitle: state?.placeTitle,
					placeNumber: state?.placeNumber,
					placeLocation: state?.placeLocation,
					placeCoordinates: state?.placeCoordinates,
				},
				handleLoading,
				handleError,
			).then(response => {
				if (response?.ok) {
					clearCart();
					setTimeout(() => {
						navigate('/');
					}, 2000);
				}
			});
		},
		[
			navigate,
			clearCart,
			cartOrder,
			cartTotalAmount,
			state?.flowId,
			state?.placeTitle,
			state?.placeNumber,
			state?.placeLocation,
			state?.placeCoordinates,
		],
	);

	useEffect(() => {
		showMainButton();
		handleMainButton(handleSubmit(produceOrder));

		return () => {
			removeMainButtonEvent(handleSubmit(produceOrder));
		};
	}, [handleSubmit, produceOrder]);

	useEffect(() => {
		setMainButtonText('Order');
	}, []);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<FormUI
				errors={errors}
				loading={loading}
				register={register}
				onSubmit={produceOrder}
				errorState={errorState}
				handleSubmit={handleSubmit}
			/>
			<SaveInfoWrapper>
				<SaveInfoField
					control={<Switch sx={{ color: theme.palette.primary.main }} defaultChecked />}
					labelPlacement={'start'}
					label="Save info"
				/>
				<FormGroupTitle styles={{ marginTop: '0.5rem' }} text={'Save contact information for future orders'} />
			</SaveInfoWrapper>

			<FormGroupTitle styles={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} text={'Check your order'} />
			<CartList cartProducts={orderCheckout} />
			<OrderInfo orderTotal={cartTotalAmount} />
		</Container>
	);
};
