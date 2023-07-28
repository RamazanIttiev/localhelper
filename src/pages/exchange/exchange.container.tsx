import React, { useCallback, useReducer } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ExchangeComponent } from './exchange.component';
import { handleFormSubmit } from '../../actions/global-actions';
import { initialState, reducer } from '../../utils/reducers';
import { useMainButton } from '../../hooks/useMainButton';

export interface ExchangeFormState {
	userName: string;
	userPhone?: string;
	exchangeAmount: number;
	exchangeCurrency: string;
}

interface RouteState {
	state: { flowId: string };
}

export const ExchangeContainer = () => {
	const { state } = useLocation() as RouteState;
	const flowId = state.flowId || '';

	const [{ loading, errorState }, dispatch] = useReducer(reducer, initialState);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ExchangeFormState>({
		defaultValues: { userName: '', userPhone: '', exchangeAmount: 0, exchangeCurrency: 'USDT' },
	});

	const onSubmit = useCallback(
		(data?: ExchangeFormState) => {
			return handleFormSubmit(dispatch, flowId, {
				...data,
			});
		},
		[dispatch, flowId],
	);

	const handleForm = useCallback(async () => {
		try {
			await handleSubmit(onSubmit)();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}, [onSubmit, handleSubmit]);

	useMainButton({ handleClick: handleForm, dispatch, errorState, buttonLabel: 'Exchange' });

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<ExchangeComponent
				errors={errors}
				loading={loading}
				register={register}
				handleForm={handleForm}
				errorState={errorState}
			/>
		</Container>
	);
};
