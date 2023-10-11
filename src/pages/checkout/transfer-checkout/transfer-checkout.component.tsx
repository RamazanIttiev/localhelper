import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { TransferCheckoutForm } from './components/transfer-checkout-form';

import { TransferFormFields } from './transfer-checkout.model';

interface Props {
	control: Control<TransferFormFields>;
	errors: FieldErrors<TransferFormFields>;
	register: UseFormRegister<TransferFormFields>;
}

export const TransferCheckoutComponent = ({ register, errors, control }: Props) => {
	return <TransferCheckoutForm control={control} errors={errors} register={register} />;
};
