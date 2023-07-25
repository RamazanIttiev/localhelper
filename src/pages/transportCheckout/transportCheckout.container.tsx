import React, { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';

import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { TelegramUser } from '../../app/App';
import { getDateDiff } from '../../utils/date';
import { useLocation } from 'react-router-dom';
import { ErrorType } from '../../models/error.model';
import { DefaultProductModel } from '../../models/product.model';
import { TransportCheckoutModel } from './transportCheckout.model';
import { TransportCheckoutComponent } from './transportCheckout.component';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';

export const TransportCheckoutContainer = () => {
	const { state } = useLocation();
	const product: DefaultProductModel = state.product || {};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TransportCheckoutModel>({
		defaultValues: { userName: TelegramUser?.first_name || '', startDate: null, endDate: null },
	});
	console.log(TelegramUser);
	console.log('window', window.Telegram.WebApp.initDataUnsafe.user);
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	const onSubmit = useCallback(
		(data: TransportCheckoutModel) => {
			return handleOrder(
				state?.flowId,
				{
					placeContact: product.contact,
					placeName: product.place,
					itemPrice: product.price,
					itemTitle: product.title,
					rentStart: data.startDate?.toDateString(),
					rentEnd: data.endDate?.toDateString(),
					rentPeriod,
				},
				handleLoading,
				handleError,
			);
		},
		[product.contact, product.place, product.price, product.title, rentPeriod, state?.flowId],
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
				rentPeriod={rentPeriod}
				errorState={errorState}
			/>
		</Container>
	);
};
