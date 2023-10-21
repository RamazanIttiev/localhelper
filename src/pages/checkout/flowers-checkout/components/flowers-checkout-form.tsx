import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputGroup } from 'reactkit/inputGroup';

import { FlowersFormFields } from '../flowers-checkout.model';

interface Props {
	errors: FieldErrors<FlowersFormFields>;
	register: UseFormRegister<FlowersFormFields>;
}

export const FlowersCheckoutForm = ({ register, errors }: Props) => {
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
				errorMessage={errors.userPhone?.message}
				required
				fullWidth
				type={'tel'}
				register={register}
				fieldName={'userPhone'}
				error={errors.userPhone !== undefined}
				placeholder={'8 999 777 03 02'}
				pattern={/^[0-9+-]+$/}
				minLength={8}
				requiredMessage={'I need your phone number'}
				minLengthMessage={'Your phone number is too short'}
				patternMessage={"I think your phone number isn't correct..."}
			/>

			<InputGroup
				label={'Address'}
				errorMessage={errors.userAddress?.message}
				required
				type={'text'}
				register={register}
				fieldName={'userAddress'}
				placeholder={'Weligama, W 15'}
				requiredMessage={'Address is required'}
				error={errors.userAddress !== undefined}
			/>
		</form>
	);
};
