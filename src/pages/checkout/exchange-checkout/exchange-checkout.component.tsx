import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Container } from '@mui/material';

import { ToChangeBox } from 'pages/checkout/exchange-checkout/components/to-change-box';
import { ToReceiveBox } from 'pages/checkout/exchange-checkout/components/to-receive-box';
import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model';
import { ToChangeState, ToReceiveState } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

import { HintText } from 'ui/atoms/hintText';
import { Separator } from 'ui/atoms/separator';

interface ExchangeComponentProps {
	exchangeRate: number | null;
	errors: FieldErrors<ExchangeFormFields>;
	register: UseFormRegister<ExchangeFormFields>;
	control: Control<ExchangeFormFields>;
	toChangeState: ToChangeState;
	toReceiveState: ToReceiveState;
}

export const ExchangeCheckoutComponent = ({
	errors,
	register,
	exchangeRate,
	control,
	toChangeState,
	toReceiveState,
}: ExchangeComponentProps) => {
	return (
		<>
			<ToChangeBox
				control={control}
				register={register}
				state={toChangeState}
				exchangeRate={exchangeRate}
				error={errors.amountToChange?.message}
			/>

			<Separator />

			<ToReceiveBox state={toReceiveState} />

			<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '1rem', position: 'relative' }}>
				<HintText
					sx={{ mt: '2rem' }}
					text={
						'After confirming your order, you will need to provide your geolocation in telegram bot so the courier can find you'
					}
				/>
			</Container>
		</>
	);
};
