import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ErrorType } from '../../models/error.model';
import { ExchangeComponent } from './exchange.component';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';

export interface ExchangeFormState {
	userName: string;
	userPhone?: string;
	exchangeAmount: number;
	exchangeCurrency: string;
}

export const ExchangeContainer = () => {
	const { state } = useLocation();
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const flowId: string = state;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ExchangeFormState>({
		defaultValues: { userName: '', userPhone: '', exchangeAmount: 0, exchangeCurrency: 'USDT' },
	});

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const handleExchange = useCallback(
		(data?: ExchangeFormState) => {
			return handleOrder(
				flowId,
				{
					...data,
				},
				handleLoading,
				handleError,
			);
		},
		[flowId],
	);

	const onSubmit = useCallback(async () => {
		try {
			await handleSubmit(handleExchange)();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}, [handleExchange, handleSubmit]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Exchange');

		handleMainButton(onSubmit);

		return () => {
			removeMainButtonEvent(onSubmit);
		};
	}, [onSubmit]);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<ExchangeComponent
				errors={errors}
				loading={loading}
				register={register}
				onSubmit={onSubmit}
				errorState={errorState}
			/>
		</Container>
	);
};
