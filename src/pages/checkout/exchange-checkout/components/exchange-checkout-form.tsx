import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputGroup } from 'reactkit/inputGroup';

import { ExchangeForm } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

interface Props {
	errors: FieldErrors<ExchangeForm>;
	register: UseFormRegister<ExchangeForm>;
}

export const ExchangeCheckoutForm = ({ register, errors }: Props) => {
	return (
		<form>
			{/*<InputGroup*/}
			{/*	label={'Name'}*/}
			{/*	errorMessage={errors.amountToChange?.message}*/}
			{/*	required*/}
			{/*	type={'text'}*/}
			{/*	register={register}*/}
			{/*	fieldName={'userName'}*/}
			{/*	requiredMessage={'Name is required'}*/}
			{/*	pattern={/^[a-zA-Z]+$/}*/}
			{/*	patternMessage={"I guess that's not a valid name..."}*/}
			{/*	error={errors.amountToChange !== undefined}*/}
			{/*	placeholder={'John'}*/}
			{/*/>*/}

			{/*<InputGroup*/}
			{/*	label={'Phone'}*/}
			{/*	required*/}
			{/*	type={'tel'}*/}
			{/*	register={register}*/}
			{/*	fieldName={'userPhone'}*/}
			{/*	error={errors.userPhone !== undefined}*/}
			{/*	placeholder={'8 999 777 03 02'}*/}
			{/*	pattern={/^[0-9+-]+$/}*/}
			{/*	minLength={8}*/}
			{/*	errorMessage={errors.userPhone?.message}*/}
			{/*	requiredMessage={'I need your phone number'}*/}
			{/*	minLengthMessage={'Your phone number is too short'}*/}
			{/*	patternMessage={"I think your phone number isn't correct..."}*/}
			{/*/>*/}
		</form>
	);
};
