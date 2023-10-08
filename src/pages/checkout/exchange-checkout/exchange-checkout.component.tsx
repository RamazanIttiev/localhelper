import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';
import { Separator } from 'reactkit/separator';

import { Container } from '@mui/material';

import { ToChangeBox } from 'pages/checkout/exchange-checkout/components/to-change-box';
import { ToReceiveBox } from 'pages/checkout/exchange-checkout/components/to-receive-box';
import {
	ExchangeForm,
	ToChangeState,
	ToReceiveState,
} from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

interface ExchangeComponentProps {
	exchangeRate: number;
	errors: FieldErrors<ExchangeForm>;
	register: UseFormRegister<ExchangeForm>;
	control: Control<ExchangeForm>;
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
