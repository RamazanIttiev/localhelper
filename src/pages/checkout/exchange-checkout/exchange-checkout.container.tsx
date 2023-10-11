import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';

import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model';
import { useBase } from 'pages/checkout/hooks/checkout.hook';

import { getTelegramUser } from 'actions/webApp-actions';

import { ReactComponent as RupeeIcon } from 'assets/svg/rupee.svg';
import { ReactComponent as USDIcon } from 'assets/svg/usd.svg';

import { theme } from 'theme/theme';

import { ExchangeCheckoutComponent } from './exchange-checkout.component';

export const ExchangeContainer = () => {
	const tgUser = getTelegramUser();
	const { exchangeRate } = useLoaderData() as { exchangeRate: Promise<number> };

	const [amountToReceive, setAmountToReceive] = useState(0);

	useEffect(() => {
		const resolveAmount = async () => {
			const amount = await exchangeRate;

			setAmountToReceive(amount);
		};

		resolveAmount();
	}, [exchangeRate]);

	const exchangeState = {
		amountToChange: {
			fieldName: 'amountToChange',
			requiredMessage: 'How much do you want to change?',
			pattern: /^[0-9+-]+$/,
			patternMessage: 'Wrong input',
			icon: <USDIcon />,
			currency: 'USD',
			required: true,
		},
		amountToReceive: {
			fieldName: 'amountToReceive',
			requiredMessage: 'amountToReceive',
			pattern: /^[0-9+-]+$/,
			patternMessage: 'Wrong input',
			icon: <RupeeIcon />,
			currency: 'LK',
			required: true,
		},
	};

	const { onSubmit, errors, register, control, isSubmitting } = useBase(
		useForm<ExchangeFormFields>({
			defaultValues: { userName: tgUser?.first_name, currency: 'USDT' },
		}),
		{ currencyToChange: 'USDT', currencyToReceive: 'LK', amountToReceive },
	);

	return (
		<>
			<ExchangeCheckoutComponent
				amountToChange={exchangeState.amountToChange}
				amountToReceive={exchangeState.amountToReceive}
				errors={errors}
				register={register}
				exchangeRate={exchangeRate}
				control={control}
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
