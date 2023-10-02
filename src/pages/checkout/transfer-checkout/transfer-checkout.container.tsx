import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

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

	const onSubmit = handleSubmit((data: TransferCheckoutModel) => {
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
	});

	return (
		<>
			<TransferCheckoutComponent register={register} errors={errors} control={control} />
			<MainButton text={'Order'} onClick={onSubmit} />
		</>
	);
};
