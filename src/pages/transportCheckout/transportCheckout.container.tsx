import React, { useCallback, useEffect, useState } from 'react';
import { TransportCheckoutComponent } from './transportCheckout.component';
import { DefaultValues, useForm } from 'react-hook-form';
import { ErrorType } from '../../models/error.model';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { TransportCheckoutModel } from './transportCheckout.model';
import { DefaultProductModel } from '../../models/product.model';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const defaultValues: DefaultValues<TransportCheckoutModel> = {
	startDate: new AdapterDayjs().date(new Date()),
	endDate: null,
};

export const TransportCheckoutContainer = () => {
	const { state } = useLocation();
	const product: DefaultProductModel = state.product || {};
	// TODO add validation if user selects future start date

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TransportCheckoutModel>({ defaultValues });

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const onSubmit = useCallback(
		(data: any) => {
			console.log(data);
			return handleOrder(
				state?.flowId,
				{
					...state,
					...data,
				},
				handleLoading,
				handleError,
			);
		},
		[state],
	);

	const handleForm = async () => {
		try {
			await handleSubmit(onSubmit)();
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
				await handleSubmit(onSubmit)();
			} catch (error) {
				// Handle any errors that occur during form submission
				console.error('Error submitting form:', error);
			}
		};

		handleMainButton(handleOrder);

		return () => {
			removeMainButtonEvent(handleOrder);
		};
	}, [handleSubmit, onSubmit]);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<TransportCheckoutComponent
				errors={errors}
				loading={loading}
				product={product}
				control={control}
				register={register}
				onSubmit={handleForm}
				errorState={errorState}
			/>
		</Container>
	);
};
