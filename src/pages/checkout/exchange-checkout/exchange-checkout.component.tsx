import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Typography } from '@mui/material';

import { ExchangeCheckoutForm } from 'pages/checkout/exchange-checkout/components/exchange-checkout-form';
import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

interface ExchangeComponentProps {
	errors: FieldErrors<ExchangeCheckoutModel>;
	register: UseFormRegister<ExchangeCheckoutModel>;
}

export const ExchangeCheckoutComponent = ({ errors, register }: ExchangeComponentProps) => {
	return (
		<>
			<ExchangeCheckoutForm errors={errors} register={register} />
			<Typography variant={'body2'} sx={{ mt: '2rem' }}>
				After confirming your order, you will need to provide your geolocation in telegram bot so the courier
				can find you
			</Typography>
		</>
	);
};
