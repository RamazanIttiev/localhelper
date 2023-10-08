import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useForm, useWatch } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useChange } from 'pages/checkout/exchange-checkout/hooks/useChange';
import { useRateFetcher } from 'pages/checkout/exchange-checkout/hooks/useRateFetcher';
import { useReceive } from 'pages/checkout/exchange-checkout/hooks/useReceive';
import { ExchangeForm } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

import { handleOrder } from 'actions/global-actions';

import { theme } from 'theme/theme';

import { ExchangeCheckoutComponent } from './exchange-checkout.component';

export const ExchangeContainer = () => {
	const { state } = useLocation();
	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
	} = useForm<ExchangeForm>({
		defaultValues: { currencyToChange: 'USD' },
	});

	const amountToChange = useWatch({ control, name: 'amountToChange' });
	const currencyToChange = useWatch({ control, name: 'currencyToChange' });

	const exchangeRate = useRateFetcher(currencyToChange);
	const toChangeState = useChange(currencyToChange);
	const toReceiveState = useReceive(exchangeRate, amountToChange);

	const flowId: string = state;

	const onSubmit = handleSubmit(
		(data: ExchangeForm) => {
			impactOccurred('light');
			return handleOrder(
				flowId,
				{
					...data,
					currencyToReceive: toReceiveState.currency,
					amountToReceive: toReceiveState.value,
				},
				() => console.log(),
				() => console.log(),
			);
		},
		() => notificationOccurred('error'),
	);

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
