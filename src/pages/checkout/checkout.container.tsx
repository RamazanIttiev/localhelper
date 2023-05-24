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
import { UserData } from '../../models/userModel';
import { saveUserInfo } from '../../api/api';

export const CheckoutContainer = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const theme = useTheme();
	const { cartTotalAmount, cartOrder, clearCart, orderCheckout } = useCart();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>();

	const [loading, setLoading] = useState(false);
	const [saveInfo, setSaveInfo] = useState(true);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleSaveInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSaveInfo(event.target.checked);
	};

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const produceOrder = useCallback(
		(userData?: UserData) => {
			return handleOrder(
				state?.flowId,
				{
					...state,
					...userData,
					order: cartOrder,
					orderTotal: cartTotalAmount,
				},
				handleLoading,
				handleError,
			).then(response => {
				if (response?.ok) {
					userData !== undefined && saveInfo && saveUserInfo(userData);
					setTimeout(() => {
						clearCart();
						navigate(-1);
					}, 2000);
				}
			});
		},
		[state, cartOrder, cartTotalAmount, saveInfo, clearCart, navigate],
	);

	const handleFormOrder = async () => {
		try {
			await handleSubmit(produceOrder)();
		} catch (error) {
			// Handle any errors that occur during form submission
			console.error('Error submitting form:', error);
		}
	};

	useEffect(() => {
		showMainButton();
		setMainButtonText('Order');

		const handleOrder = async () => {
			try {
				await handleSubmit(produceOrder)();
			} catch (error) {
				// Handle any errors that occur during form submission
				console.error('Error submitting form:', error);
			}
		};

		handleMainButton(handleOrder);

		return () => {
			removeMainButtonEvent(handleOrder);
		};
	}, [handleSubmit, produceOrder]);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<FormUI
				errors={errors}
				loading={loading}
				register={register}
				onSubmit={handleFormOrder}
				errorState={errorState}
				handleSubmit={handleSubmit}
			/>
			<SaveInfoWrapper>
				<SaveInfoField
					control={
						<Switch
							checked={saveInfo}
							onChange={handleSaveInfo}
							sx={{ color: theme.palette.primary.main }}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
					labelPlacement={'start'}
					label="Save info"
				/>
				<FormGroupTitle styles={{ marginTop: '0.5rem' }} text={'Save contact information for future orders'} />
			</SaveInfoWrapper>

			<FormGroupTitle
				styles={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
				text={`Your order from ${state?.placeTitle}`}
			/>
			<CartList cartProducts={orderCheckout} />
			<OrderInfo orderTotal={cartTotalAmount} />
		</Container>
	);
};
