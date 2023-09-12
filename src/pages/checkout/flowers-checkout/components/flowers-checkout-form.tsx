import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintTitle } from 'reactkit/hintTitle';
import { Input } from 'reactkit/input';

import { Box } from '@mui/material';

import { FlowersCheckoutModel } from '../flowers-checkout.model';

interface Props {
	errors: FieldErrors<FlowersCheckoutModel>;
	register: UseFormRegister<FlowersCheckoutModel>;
}

export const FlowersCheckoutForm = ({ register, errors }: Props) => {
	console.log(errors);
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
				<HintTitle text={'Phone'} />
				<Input
					fullWidth
					type={'tel'}
					margin="dense"
					color={'info'}
					error={errors.userPhone !== undefined}
					placeholder={'8 999 777 03 02'}
					{...register('userPhone', {
						required: { value: true, message: 'I need your phone number' },
						pattern: { value: /^[0-9+-]+$/, message: "I think your phone number isn't correct..." },
						minLength: { value: 8, message: 'Your phone number is too short' },
					})}
				/>
				{<ErrorText text={errors.userPhone?.message} />}
			</Box>

			<Box mb={'1rem'}>
				<HintTitle text={'Address'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.deliveryAddress !== undefined}
					placeholder={'Weligama, W 15'}
					{...register('deliveryAddress', {
						required: {
							value: true,
							message: 'Address is required',
						},
					})}
				/>
				{<ErrorText text={errors.deliveryAddress?.message} />}
			</Box>
		</form>
	);
};
