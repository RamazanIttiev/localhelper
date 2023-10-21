import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputGroup } from 'reactkit/inputGroup';

import { RestaurantFormFields } from 'pages/checkout/restaurant-checkout/rent-checkout.model';

interface FormUIProps {
	errors: FieldErrors<RestaurantFormFields>;
	register: UseFormRegister<RestaurantFormFields>;
}

export const RestaurantCheckoutForm = ({ register, errors }: FormUIProps) => {
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
				label={'Hotel'}
				errorMessage={errors.userPhone?.message}
				fullWidth
				type={'text'}
				register={register}
				placeholder={'Hotel'}
				fieldName={'userHotel'}
			/>
		</form>
	);
};
