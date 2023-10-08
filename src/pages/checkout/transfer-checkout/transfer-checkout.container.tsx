import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'theme/theme';

import { TransferCheckoutComponent } from './transfer-checkout.component';
import { TransferCheckoutModel } from './transfer-checkout.model';

export const TransferCheckoutContainer = () => {
	const { state } = useLocation();
	const tgUser = getTelegramUser();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const flowId = state.flowId || '';

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<TransferCheckoutModel>({
		defaultValues: { userName: tgUser?.first_name, date: null },
	});

	const onSubmit = handleSubmit(
		(data: TransferCheckoutModel) => {
			impactOccurred('light');
			return handleOrder(flowId, {
				...data,
				date: data.date?.toISOString(),
				tgUserNick: tgUser?.username,
			});
		},
		() => notificationOccurred('error'),
	);

	return (
		<>
			<TransferCheckoutComponent register={register} errors={errors} control={control} />
			<MainButton
				text={'Order'}
				onClick={onSubmit}
				disabled={isSubmitting}
				progress={isSubmitting}
				color={
					isSubmitting ? theme.tg_theme.palette.button_disabled_color : theme.tg_theme.palette.button_color
				}
			/>
		</>
	);
};
