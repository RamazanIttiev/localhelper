import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useLocation } from 'react-router-dom';

import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

import { handleOrder } from 'actions/global-actions';
import { getTelegramUser } from 'actions/webApp-actions';

import { ReactComponent as RupeeIcon } from 'assets/svg/rupee.svg';
import { ReactComponent as USDIcon } from 'assets/svg/usd.svg';

import { theme } from 'theme/theme';

import { ExchangeCheckoutComponent } from './exchange-checkout.component';

export const ExchangeContainer = () => {
	const { state } = useLocation();
	const tgUser = getTelegramUser();
	const { exchangeRate } = useLoaderData() as { exchangeRate: Promise<number> };

	const [impactOccurred, notificationOccurred] = useHapticFeedback();

	const [amountToReceive, setAmountToReceive] = useState(0);

	useEffect(() => {
		const resolveAmount = async () => {
			const amount = await exchangeRate;

			setAmountToReceive(amount);
		};

		resolveAmount();
	}, [exchangeRate]);

	const flowId: string = state;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
	} = useForm<ExchangeCheckoutModel>({
		defaultValues: { userName: tgUser?.first_name, currency: 'USDT' },
	});

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

	const onSubmit = handleSubmit(
		(data: ExchangeCheckoutModel) => {
			impactOccurred('light');
			return handleOrder(flowId, {
				...data,
				currencyToChange: 'USDT',
				currencyToReceive: 'LK',
				amountToReceive,
			});
		},
		() => notificationOccurred('error'),
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
