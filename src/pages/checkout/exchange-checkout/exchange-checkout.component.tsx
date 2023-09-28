import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HintText } from 'reactkit/hintText';
import { Separator } from 'reactkit/separator';

import { Container } from '@mui/material';

import { ExchangeCheckoutForm } from 'pages/checkout/exchange-checkout/components/exchange-checkout-form';
import { ExchangeCurrencyInput } from 'pages/checkout/exchange-checkout/components/exchange-input/exchange-currency-input';
import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

interface ExchangeComponentProps {
	errors: FieldErrors<ExchangeCheckoutModel>;
	register: UseFormRegister<ExchangeCheckoutModel>;
}

export const ExchangeCheckoutComponent = ({ errors, register }: ExchangeComponentProps) => {
	return (
		<>
			<ExchangeCurrencyInput register={register} errors={errors} />
			<Separator />
			<ExchangeCurrencyInput register={register} errors={errors} />
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
