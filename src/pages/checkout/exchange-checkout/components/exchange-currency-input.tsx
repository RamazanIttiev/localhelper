import React, { Suspense } from 'react';
import { Control, FieldError, UseFormRegister, useWatch } from 'react-hook-form';
import { Await } from 'react-router-dom';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';

import { Box, Skeleton, Typography } from '@mui/material';

import { ExchangeCheckoutModel, ExchangeState } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

import { computeAmount } from 'utils/service';

import { theme } from 'theme/theme';

interface Props {
	exchangeRate: Promise<number>;
	error: FieldError | undefined;
	register: UseFormRegister<ExchangeCheckoutModel>;
	state: ExchangeState;
	control: Control<ExchangeCheckoutModel>;
}

export const ExchangeCurrencyInput = ({ error, register, state, exchangeRate, control }: Props) => {
	const amountToChange = useWatch({ control, name: 'amountToChange' });

	return (
		<Box sx={{ background: theme.tg_theme.palette.bg_color, p: 2, position: 'relative' }}>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ mr: 1, lineHeight: 1 }}>{state.icon}</Box>
				<Typography sx={{ color: theme.tg_theme.palette.hint_color, fontSize: theme.tg_theme.fontSize.info }}>
					{state.fieldName === 'amountToChange' ? 'You pay' : 'You will receive'}
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					m: '24px 0',
				}}>
				{state.fieldName === 'amountToChange' ? (
					<Input
						autoComplete={'off'}
						required={state.required}
						type="number"
						register={register}
						requiredMessage={state.requiredMessage}
						pattern={state.pattern}
						patternMessage={state.patternMessage}
						fieldName={state.fieldName}
						placeholder="0"
						error={error !== undefined}
						inputStyles={{
							p: '0 16px 0 0',
							borderRadius: 'none',
							fontSize: theme.tg_theme.fontSize.extraLargeTitle,
						}}
					/>
				) : (
					<Suspense
						fallback={
							<Typography
								sx={{
									fontSize: theme.tg_theme.fontSize.extraLargeTitle,
								}}>
								0
							</Typography>
						}>
						<Await
							resolve={exchangeRate}
							children={resolvedRate => {
								return (
									<Typography
										sx={{
											overflow: 'hidden',
											color: theme.tg_theme.palette.text_color,
											fontSize: theme.tg_theme.fontSize.extraLargeTitle,
										}}>
										{computeAmount(amountToChange, resolvedRate) || 0}
									</Typography>
								);
							}}
						/>
					</Suspense>
				)}
				<Typography
					sx={{
						color: theme.tg_theme.palette.hint_color,
						fontWeight: theme.tg_theme.fontWeight.bold,
						fontSize: theme.tg_theme.fontSize.largeTitle,
					}}>
					{state.currency}
				</Typography>
			</Box>

			{error?.message ? (
				<ErrorText text={error?.message} sx={{ ml: 0 }} />
			) : (
				state.fieldName === 'amountToChange' && (
					<Suspense fallback={<Skeleton sx={{ width: '100px', height: '21px' }} />}>
						<Await
							resolve={exchangeRate}
							children={resolvedRate => {
								return (
									<Typography
										sx={{
											color: theme.tg_theme.palette.hint_color,
											fontSize: theme.tg_theme.fontSize.info,
										}}>
										1 {state.currency} ~ {resolvedRate} LK
									</Typography>
								);
							}}
						/>
					</Suspense>
				)
			)}
		</Box>
	);
};