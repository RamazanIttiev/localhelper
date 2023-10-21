import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import React from 'react';
import { Control, UseFormRegister, useWatch } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';
import { Select } from 'reactkit/select';

import { Box, Skeleton, Typography } from '@mui/material';

import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model';
import { ToChangeState } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';
import { amountToChangeValidation } from 'pages/checkout/exchange-checkout/service/validation';

import { theme } from 'theme/theme';

interface Props {
	exchangeRate: number | null;
	error?: string | undefined;
	register: UseFormRegister<ExchangeFormFields>;
	control: Control<ExchangeFormFields>;
	state: ToChangeState;
}

export const ToChangeBox = ({ error, register, exchangeRate, control, state }: Props) => {
	const currencyToChange = useWatch({ control, name: 'currencyToChange' });
	const [impactOccurred] = useHapticFeedback();

	return (
		<Box sx={{ background: theme.tg_theme.palette.bg_color, p: 2, position: 'relative' }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ mr: 1, lineHeight: 1 }}>{state.icon}</Box>
				<Typography sx={{ color: theme.tg_theme.palette.hint_color, fontSize: theme.tg_theme.fontSize.info }}>
					You pay
				</Typography>
			</Box>

			<Box
				onClick={() => impactOccurred('light')}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					m: '24px 0',
				}}>
				<Input
					{...amountToChangeValidation}
					type="tel"
					register={register}
					placeholder="0"
					error={error !== undefined}
					inputStyles={{
						p: '0 16px 0 0',
						borderRadius: 'none',
						fontSize: theme.tg_theme.fontSize.extraLargeTitle,
					}}
				/>

				<Select
					fieldName="currencyToChange"
					options={['USDT', 'RUB']}
					register={register}
					defaultValue={'USDT'}
					sx={{
						color: theme.tg_theme.palette.hint_color,
						fontWeight: theme.tg_theme.fontWeight.bold,
						fontSize: theme.tg_theme.fontSize.largeTitle,
					}}
				/>
			</Box>

			{error ? (
				<ErrorText text={error} sx={{ ml: 0 }} />
			) : exchangeRate ? (
				<Typography
					sx={{
						color: theme.tg_theme.palette.hint_color,
						fontSize: theme.tg_theme.fontSize.info,
					}}>
					1 {currencyToChange} ~ {exchangeRate} LKR
				</Typography>
			) : (
				<Skeleton sx={{ width: '100px', height: '21px' }} />
			)}
		</Box>
	);
};