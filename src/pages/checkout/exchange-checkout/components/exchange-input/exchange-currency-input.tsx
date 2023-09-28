import React, { ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';

import { Box, Typography } from '@mui/material';

import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

import { ReactComponent as USDIcon } from 'assets/svg/usd.svg';

import { theme } from '../../../../../theme/theme';

interface Props {
	icon?: ReactNode;
	currencyRate?: number;
	currencyToChange?: number;
	currencyToReceive?: number;
	errors: FieldErrors<ExchangeCheckoutModel>;
	register: UseFormRegister<ExchangeCheckoutModel>;
}

export const ExchangeCurrencyInput = ({ errors, register }: Props) => {
	return (
		<Box sx={{ background: theme.tg_theme.palette.secondary_bg_color, p: 2, position: 'relative' }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ mr: 1, lineHeight: 1 }}>
					<USDIcon />
				</Box>
				<Typography sx={{ color: theme.tg_theme.palette.hint_color, fontSize: theme.tg_theme.fontSize.info }}>
					You pay
				</Typography>
			</Box>

			<Box sx={{ display: 'flex', alignItems: 'center', m: '24px 0' }}>
				<Input
					label={'Amount'}
					required
					type="number"
					register={register}
					requiredMessage={'Amount can not be 0'}
					pattern={/^[0-9+-]+$/}
					patternMessage={'Wrong input'}
					fieldName={'exchangeAmount'}
					placeholder="100 000"
					error={errors.exchangeAmount !== undefined}
					inputStyles={{
						p: '0 16px 0 0',
						borderRadius: 'none',
						fontSize: theme.tg_theme.fontSize.extraLargeTitle,
					}}
				/>
				<Typography
					sx={{
						color: theme.tg_theme.palette.hint_color,
						fontWeight: theme.tg_theme.fontWeight.bold,
						fontSize: theme.tg_theme.fontSize.largeTitle,
					}}>
					USD
				</Typography>
			</Box>

			{errors.exchangeAmount?.message ? (
				<ErrorText text={errors.exchangeAmount?.message} sx={{ ml: 0 }} />
			) : (
				<Typography
					sx={{
						color: theme.tg_theme.palette.hint_color,
						fontSize: theme.tg_theme.fontSize.info,
					}}>
					1 USD ~ 320 LK
				</Typography>
			)}
		</Box>
	);
};
