import React, { useCallback, useEffect, useState } from 'react';
import { FormUI } from './components/form.component';
import { Container, Switch, useTheme } from '@mui/material';
import { OrderInfo } from './components/orderInfo';
import { SaveInfoField, SaveInfoWrapper } from './checkout.styled';
import { ErrorType } from '../../models/error';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FormGroupTitle } from './components/formGroupTitle';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useForm } from 'react-hook-form';

export interface FormInput {
	userName: string;
	userPhone: string;
	userHotel: string;
	userAddress: string;
}

export const CheckoutContainer = () => {
	const theme = useTheme();
	const { state } = useLocation();
	const { cartTotalAmount, cartOrder } = useCart();
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
					coordinates: state?.coordinates !== undefined ? state.coordinates : undefined,
				},
				handleLoading,
				handleError,
			);
		},
		[cartOrder, cartTotalAmount, state.coordinates, state?.flowId],
	);

	useEffect(() => {
		showMainButton();
		handleMainButton(produceOrder);

		return () => {
			removeMainButtonEvent(produceOrder);
		};
	}, [produceOrder]);

	useEffect(() => {
		setMainButtonText('Order');
	}, []);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState, state]);

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '3rem', position: 'relative' }}>
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
			<OrderInfo orderTotal={cartTotalAmount} />
		</Container>
	);
};
