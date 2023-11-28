import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm, useWatch } from 'react-hook-form';

import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';

import { getDateDiff } from 'common/utils/date.ts';

import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';

import { RentCheckoutComponent } from './rent-checkout.component.tsx';
import { RentFormFields } from './rent-checkout.model.ts';
import { DefaultItemModel } from 'ui/organisms/item/domain/item.model.ts';

export const RentCheckoutContainer = () => {
	const tgUser = getTelegramUser();

	const { state, onSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<RentFormFields>({
			defaultValues: { userName: tgUser?.first_name, startDate: null, endDate: null },
		}),
		{ tgUserNick: tgUser?.username },
	);

	const item: DefaultItemModel = state.item || {};
	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	return (
		<>
			<RentCheckoutComponent
				errors={errors}
				item={item}
				control={control}
				register={register}
				rentPeriod={rentPeriod}
			/>
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
