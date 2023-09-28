import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { handleOrder } from 'actions/global-actions';
import {
	getTelegramUser,
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
	const tgUser = getTelegramUser();

	const flowId = state.flowId || '';

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TransferCheckoutModel>({
		defaultValues: { userName: tgUser?.first_name, date: null },
	});

	const onSubmit = useCallback(
		(data: TransferCheckoutModel) => {
			return handleOrder(
				flowId,
				{
					...data,
					date: data.date?.toISOString(),
					tgUserNick: tgUser?.username,
				},
				() => console.log(),
				() => console.log(),
			);
		},
		[flowId, tgUser?.username],
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

	return <TransferCheckoutComponent register={register} errors={errors} control={control} />;
};
