import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { TransferCheckoutForm } from './components/transfer-checkout-form';

import { TransferCheckoutModel } from './transfer-checkout.model';

interface Props {
	control: Control<TransferCheckoutModel>;
	errors: FieldErrors<TransferCheckoutModel>;
	register: UseFormRegister<TransferCheckoutModel>;
}

export const TransferCheckoutComponent = ({ register, errors, control }: Props) => {
	return <TransferCheckoutForm control={control} errors={errors} register={register} />;
};
