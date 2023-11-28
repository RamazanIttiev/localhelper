import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';

import { handleOrder } from 'actions/global-actions.ts';
import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';

import { TransferCheckoutComponent } from './transfer-checkout.component.tsx';
import { TransferFormFields } from './transfer-checkout.model.ts';

export const TransferCheckoutContainer = () => {
	const { state } = useLocation();

	const tgUser = getTelegramUser();
	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const { handleSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<TransferFormFields>({
			defaultValues: { userName: tgUser?.first_name, date: null },
		}),
		{ tgUserNick: tgUser?.username },
	);

	const onSubmit = handleSubmit(
		(formData: any) => {
			impactOccurred('light');
			void handleOrder(state?.flowId, {
				item: state?.item.id || '',
				...formData,
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
