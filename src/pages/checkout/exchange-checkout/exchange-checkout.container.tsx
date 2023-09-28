import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

import { handleOrder } from 'actions/global-actions';
import {
	getTelegramUser,
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from 'actions/webApp-actions';

import { ExchangeCheckoutComponent } from './exchange-checkout.component';

export const ExchangeContainer = () => {
	const { state } = useLocation();
	const tgUser = getTelegramUser();

	const flowId: string = state;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ExchangeCheckoutModel>({
		defaultValues: { userName: tgUser?.first_name, exchangeCurrency: 'USDT' },
	});

	const onSubmit = useCallback(
		(data: ExchangeCheckoutModel) => {
			return handleOrder(
				flowId,
				{
					...data,
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
	}, [onSubmit, handleSubmit]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Exchange');

		handleMainButton(handleForm);

		return () => {
			removeMainButtonEvent(handleForm);
		};
	}, [handleForm]);

	return <ExchangeCheckoutComponent errors={errors} register={register} />;
};
