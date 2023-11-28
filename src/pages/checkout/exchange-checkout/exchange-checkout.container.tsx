import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useForm, useWatch } from 'react-hook-form';

import { ExchangeCheckoutComponent } from 'pages/checkout/exchange-checkout/exchange-checkout.component.tsx';
import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model.ts';
import { useChange } from 'pages/checkout/exchange-checkout/hooks/useChange.tsx';
import { useCurrencyRate } from 'pages/checkout/exchange-checkout/hooks/useRateFetcher.tsx';
import { useReceive } from 'pages/checkout/exchange-checkout/hooks/useReceive.tsx';
import { useBase } from 'pages/checkout/hooks/checkout.hook.ts';

import { getTelegramUser } from 'actions/webApp-actions.ts';

import { theme } from 'ui/theme/theme.ts';

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
