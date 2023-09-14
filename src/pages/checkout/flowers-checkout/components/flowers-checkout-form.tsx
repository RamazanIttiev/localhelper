import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';
import { Label } from 'reactkit/label';

import { Box } from '@mui/material';

import { FlowersCheckoutModel } from '../flowers-checkout.model';

interface Props {
	errors: FieldErrors<FlowersCheckoutModel>;
	register: UseFormRegister<FlowersCheckoutModel>;
}

export const FlowersCheckoutForm = ({ register, errors }: Props) => {
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

			<Box mb={'1rem'}>
				<Label text={'Phone'} />
				<Input
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
				{<ErrorText text={errors.userPhone?.message} />}
			</Box>

			<Box>
				<Label text={'Address'} />
				<Input
					required
					type={'text'}
					register={register}
					fieldName={'userAddress'}
					placeholder={'Weligama, W 15'}
					requiredMessage={'Address is required'}
					error={errors.userAddress !== undefined}
				/>
				{<ErrorText text={errors.userAddress?.message} />}
			</Box>
		</form>
	);
};