import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm } from 'react-hook-form';

import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';

import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';

import { FlowersCheckoutComponent } from './flowers-checkout.component.tsx';
import { FlowersFormFields } from './flowers-checkout.model.ts';
import { DefaultItemModel } from 'ui/organisms/item/domain/item.model.ts';

export const FlowersCheckoutContainer = () => {
	const tgUser = getTelegramUser();

	const { state, onSubmit, errors, register, isSubmitting } = useBase(
		useForm<FlowersFormFields>({ defaultValues: { userName: tgUser?.first_name } }),
		{ tgUserNick: tgUser?.username },
	);

	const item: DefaultItemModel = state.item || {};

	return (
		<>
			<FlowersCheckoutComponent item={item} register={register} errors={errors} />
			<MainButton
				text={'Order'}
				onClick={() => {}}
				disabled={isSubmitting}
				progress={isSubmitting}
				color={
					isSubmitting ? theme.tg_theme.palette.button_disabled_color : theme.tg_theme.palette.button_color
				}
			/>
		</>
	);
};
