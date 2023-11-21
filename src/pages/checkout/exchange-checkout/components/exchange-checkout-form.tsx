import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ExchangeFormFields } from 'pages/checkout/exchange-checkout/exchange-checkout.model';

import { InputGroup } from 'ui/molecules/inputGroup';

interface Props {
	errors: FieldErrors<ExchangeFormFields>;
	register: UseFormRegister<ExchangeFormFields>;
}

export const ExchangeCheckoutForm = ({ register, errors }: Props) => {
	return (
		<form>
			<InputGroup
				label={'Name'}
				errorMessage={errors.userName?.message}
				required
				type={'text'}
				register={register}
				fieldName={'userName'}
				requiredMessage={'Name is required'}
				pattern={/^[a-zA-Z]+$/}
				patternMessage={"I guess that's not a valid name..."}
				error={errors.userName !== undefined}
				placeholder={'John'}
			/>

			<InputGroup
				label={'Phone'}
				required
				type={'tel'}
				register={register}
				fieldName={'userPhone'}
				error={errors.userPhone !== undefined}
				placeholder={'8 999 777 03 02'}
				pattern={/^[0-9+-]+$/}
				minLength={8}
				errorMessage={errors.userPhone?.message}
				requiredMessage={'I need your phone number'}
				minLengthMessage={'Your phone number is too short'}
				patternMessage={"I think your phone number isn't correct..."}
			/>
		</form>
	);
};
