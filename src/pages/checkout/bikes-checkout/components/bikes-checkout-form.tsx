import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintTitle } from 'reactkit/hintTitle';
import { Input } from 'reactkit/input';

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
				<HintTitle text={'Name'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.userName !== undefined}
					placeholder={'John'}
					{...register('userName', {
						required: {
							value: true,
							message: 'Name is required',
						},
						pattern: {
							value: /^[a-zA-Z]+$/,
							message: "I guess that's not a valid name...",
						},
					})}
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
