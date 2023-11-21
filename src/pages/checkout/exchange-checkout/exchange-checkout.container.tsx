import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm, useWatch } from 'react-hook-form';

import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model';
import { useChange } from 'pages/checkout/exchange-checkout/hooks/useChange';
import { useCurrencyRate } from 'pages/checkout/exchange-checkout/hooks/useRateFetcher';
import { useReceive } from 'pages/checkout/exchange-checkout/hooks/useReceive';
import { useBase } from 'pages/checkout/hooks/checkout.hook';

import { getTelegramUser } from 'actions/webApp-actions';

import { theme } from 'ui/theme/theme';

import { ExchangeCheckoutComponent } from './exchange-checkout.component';

export const ExchangeContainer = () => {
	const tgUser = getTelegramUser();

	const { onSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<ExchangeFormFields>({
			defaultValues: { userName: tgUser?.first_name, currencyToChange: 'USDT' },
		}),
		{ currencyToReceive: 'LKR' },
	);

	const amountToChange = useWatch({ control, name: 'amountToChange' });
	const currencyToChange = useWatch({ control, name: 'currencyToChange' });

	const exchangeRate = useCurrencyRate(currencyToChange);
	const toChangeState = useChange(currencyToChange);
	const toReceiveState = useReceive(exchangeRate, amountToChange);

	return (
		<>
			<ExchangeCheckoutComponent
				errors={errors}
				register={register}
				exchangeRate={exchangeRate}
				control={control}
				toChangeState={toChangeState}
				toReceiveState={toReceiveState}
			/>
			<MainButton
				text="Exchange"
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
