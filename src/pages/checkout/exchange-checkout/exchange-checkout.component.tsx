import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Container, Typography } from '@mui/material';

import { ExchangeCheckoutForm } from 'pages/checkout/exchange-checkout/components/exchange-checkout-form';
import { ExchangeCheckoutModel } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

interface ExchangeComponentProps {
	errors: FieldErrors<ExchangeCheckoutModel>;
	register: UseFormRegister<ExchangeCheckoutModel>;
}

export const ExchangeCheckoutComponent = ({ errors, register }: ExchangeComponentProps) => {
	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<ExchangeCheckoutForm errors={errors} register={register} />
			<Typography variant={'body2'} sx={{ mt: '2rem' }}>
				After confirming your order, you will need to provide your geolocation in telegram bot so the courier
				can find you
			</Typography>
		</Container>
	);
};
