import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputGroup } from 'reactkit/inputGroup';

import { DateRange } from 'components/dateRange';

import { RentCheckoutModel } from '../rent-checkout.model';

interface Props {
	errors: FieldErrors<RentCheckoutModel>;
	control: Control<RentCheckoutModel>;
	register: UseFormRegister<RentCheckoutModel>;
}

export const RentCheckoutForm = ({ register, errors, control }: Props) => {
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

			<DateRange
				control={control}
				register={register}
				errors={errors}
				endPlaceholderText={'Rental end date'}
				startPlaceholderText={'Rental start date'}
				endValidationText={'Select rental end date'}
				startValidationText={'When do you need the bike?'}
			/>
		</form>
	);
};
