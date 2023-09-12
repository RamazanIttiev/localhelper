import { createElement, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { handleOrder } from 'actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

import { TransferCheckoutComponent } from './transfer-checkout.component';
import { TransferCheckoutModel } from './transfer-checkout.model';

export const TransferCheckoutContainer = () => {
	const { state } = useLocation();

	const flowId = state.flowId || '';

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TransferCheckoutModel>({
		defaultValues: { date: null },
	});

	const onSubmit = useCallback(
		(data: TransferCheckoutModel) => {
			return handleOrder(
				flowId,
				{
					...data,
					date: data.date?.toISOString(),
				},
				() => console.log(),
				() => console.log(),
			);
		},
		[flowId],
	);

	const handleForm = useCallback(async () => {
		try {
			await handleSubmit(onSubmit)();
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}, [handleSubmit, onSubmit]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Order');
		handleMainButton(handleForm);

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleForm);
		};
	}, [handleForm]);

	return createElement(TransferCheckoutComponent, {
		control,
		register,
		errors,
	});
};
