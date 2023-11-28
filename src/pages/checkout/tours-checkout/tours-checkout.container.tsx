import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';

import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';

import { handleOrder } from 'actions/global-actions.ts';
import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';

import { ToursCheckoutComponent } from './tours-checkout.component.tsx';
import { ToursFormFields } from './tours-checkout.model.ts';
import { DefaultItemModel } from 'ui/organisms/item/domain/item.model.ts';

export const ToursCheckoutContainer = () => {
	const tgUser = getTelegramUser();
	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const { state, handleSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<ToursFormFields>({ defaultValues: { userName: tgUser?.first_name } }),
		{ tgUserNick: tgUser?.username },
	);

	const item: DefaultItemModel = state.item || {};

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
			<ToursCheckoutComponent errors={errors} control={control} item={item} register={register} />
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
