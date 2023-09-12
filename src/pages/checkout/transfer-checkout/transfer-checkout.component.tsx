import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Container } from '@mui/material';

import { TransferCheckoutForm } from './components/transfer-checkout-form';

import { TransferCheckoutModel } from './transfer-checkout.model';

interface Props {
	control: Control<TransferCheckoutModel>;
	errors: FieldErrors<TransferCheckoutModel>;
	register: UseFormRegister<TransferCheckoutModel>;
}

export const TransferCheckoutComponent = ({ register, errors, control }: Props) => {
	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '4rem', position: 'relative' }}>
			<TransferCheckoutForm control={control} errors={errors} register={register} />
		</Container>
	);
};
