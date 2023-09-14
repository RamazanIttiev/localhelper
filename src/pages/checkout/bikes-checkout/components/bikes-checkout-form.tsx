import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';
import { Label } from 'reactkit/label';

import { Box } from '@mui/material';

import { DateRange } from 'components/dateRange';

import { BikesCheckoutModel } from '../bikes-checkout.model';

interface Props {
	errors: FieldErrors<BikesCheckoutModel>;
	control: Control<BikesCheckoutModel>;
	register: UseFormRegister<BikesCheckoutModel>;
}

export const BikesCheckoutForm = ({ register, errors, control }: Props) => {
	return (
		<form>
			<Box mb={'1rem'}>
				<Label text={'Name'} />
				<Input
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
				<ErrorText text={errors.userName?.message} />
			</Box>
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
