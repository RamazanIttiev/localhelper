import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm, useWatch } from 'react-hook-form';

import { useBase } from 'pages/checkout/hooks/checkout.hook';
import { DefaultItemModel } from 'pages/items-list/item/item.model';

import { getDateDiff } from 'utils/date';

import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'theme/theme';

import { BikesCheckoutComponent } from './bikes-checkout.component';
import { BikesFormFields } from './bikes-checkout.model';

export const BikesCheckoutContainer = () => {
	const tgUser = getTelegramUser();

	const { state, onSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<BikesFormFields>({
			defaultValues: { userName: tgUser?.first_name, startDate: null, endDate: null },
		}),
	);

	const item: DefaultItemModel = state.item || {};
	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	const rentPeriod = getDateDiff(startDate, endDate);

	return (
		<>
			<BikesCheckoutComponent
				errors={errors}
				item={item}
				control={control}
				register={register}
				rentPeriod={rentPeriod}
			/>
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
