import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';

import { handleOrder } from 'actions/global-actions.ts';
import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';

import { FlowersCheckoutComponent } from './flowers-checkout.component.tsx';
import { FlowersFormFields } from './flowers-checkout.model.ts';
import { DefaultItemModel } from 'ui/organisms/item/domain/item.model.ts';

export const FlowersCheckoutContainer = () => {
	const tgUser = getTelegramUser();

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const { state, handleSubmit, errors, register, isSubmitting } = useBase(
		useForm<FlowersFormFields>({ defaultValues: { userName: tgUser?.first_name } }),
		{ tgUserNick: tgUser?.username },
	);

	const item: DefaultItemModel = state.item || {};

	const onSubmit = useCallback(() => {
		handleSubmit(
			(formData: any) => {
				impactOccurred('light');
				void handleOrder(state?.flowId, {
					item: state?.item.id || '',
					...formData,
				});
			},
			() => notificationOccurred('error'),
		);
	}, [handleSubmit, impactOccurred, notificationOccurred, state?.flowId, state?.item.id]);

	return (
		<>
			<FlowersCheckoutComponent item={item} register={register} errors={errors} />
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
