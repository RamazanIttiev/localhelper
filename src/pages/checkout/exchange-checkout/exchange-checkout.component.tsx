import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';
import { Separator } from 'reactkit/separator';

import { Container } from '@mui/material';

import { ExchangeCheckoutForm } from 'pages/checkout/exchange-checkout/components/exchange-checkout-form';
import { ExchangeCurrencyInput } from 'pages/checkout/exchange-checkout/components/exchange-currency-input';
import { ExchangeFormFields, ExchangeState } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

interface ExchangeComponentProps {
	exchangeRate: Promise<number>;
	amountToChange: ExchangeState;
	amountToReceive: ExchangeState;
	errors: FieldErrors<ExchangeFormFields>;
	register: UseFormRegister<ExchangeFormFields>;
	control: Control<ExchangeFormFields>;
}

export const ExchangeCheckoutComponent = ({
	errors,
	register,
	amountToChange,
	amountToReceive,
	exchangeRate,
	control,
}: ExchangeComponentProps) => {
	return (
		<>
			<ExchangeCurrencyInput
				register={register}
				error={errors.amountToChange}
				state={amountToChange}
				exchangeRate={exchangeRate}
				control={control}
			/>

			<Separator />

			<ExchangeCurrencyInput
				register={register}
				error={errors.amountToReceive}
				state={amountToReceive}
				exchangeRate={exchangeRate}
				control={control}
			/>

			<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '1rem', position: 'relative' }}>
				<ExchangeCheckoutForm errors={errors} register={register} />
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
