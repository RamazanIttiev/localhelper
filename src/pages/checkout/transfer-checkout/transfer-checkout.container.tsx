import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';

import { useBase } from 'pages/checkout/hooks/checkout.hook';

import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'ui/theme/theme';

import { TransferCheckoutComponent } from './transfer-checkout.component';
import { TransferFormFields } from './transfer-checkout.model';

export const TransferCheckoutContainer = () => {
	const tgUser = getTelegramUser();

	const { onSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<TransferFormFields>({
			defaultValues: { userName: tgUser?.first_name, date: null },
		}),
		{ tgUserNick: tgUser?.username },
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
