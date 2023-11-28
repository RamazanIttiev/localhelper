import { Suspense } from 'react';
import { FieldError, UseFormRegister, Control, useWatch } from 'react-hook-form';
import { Await } from 'react-router-dom';

import { Box, Typography, Skeleton } from '@mui/material';

import { ExchangeState, ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model.ts';

import { computeAmount } from 'common/utils/service.ts';

import { theme } from 'ui/theme/theme.ts';

import { ErrorText } from 'ui/atoms/errorText.tsx';
import { Input } from 'ui/atoms/input.tsx';

interface Props {
	exchangeRate: Promise<number>;
	error: FieldError | undefined;
	register: UseFormRegister<ExchangeFormFields>;
	state: ExchangeState;
	control: Control<ExchangeFormFields>;
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
						required={state.required}
						type="tel"
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
										1 {state.currency} ~ {resolvedRate} LKR
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
