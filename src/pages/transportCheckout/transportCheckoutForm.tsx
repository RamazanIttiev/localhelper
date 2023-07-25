import React from 'react';
import { Box } from '@mui/material';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '../../components/input';
import { ErrorText } from '../../components/errorText';
import { HintTitle } from '../../components/hintTitle';
import { DateRange } from '../../components/dateRange';
import { TransportCheckoutModel } from './transportCheckout.model';

interface Props {
	errors: FieldErrors<TransportCheckoutModel>;
	control: Control<TransportCheckoutModel>;
	register: UseFormRegister<TransportCheckoutModel>;
}

export const TransportCheckoutForm = ({ register, errors, control }: Props) => {
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
