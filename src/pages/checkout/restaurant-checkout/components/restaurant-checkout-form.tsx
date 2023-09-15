import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';
import { Label } from 'reactkit/label';
import { LoaderButton } from 'reactkit/loaderButton';

import { Box } from '@mui/material';

import { RestaurantCheckoutModel } from 'pages/checkout/restaurant-checkout/rent-checkout.model';

import { isUserAgentTelegram } from 'utils/deviceInfo';

interface FormUIProps {
	onSubmit: () => void;
	errors: FieldErrors<RestaurantCheckoutModel>;
	register: UseFormRegister<RestaurantCheckoutModel>;
}

export const RestaurantCheckoutForm = ({ register, errors, onSubmit }: FormUIProps) => {
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
				{errors.userName?.type !== 'required' && <ErrorText text={errors.userName?.message} />}
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
				{errors.userPhone?.type !== 'required' && <ErrorText text={errors.userPhone?.message} />}
			</Box>
			<Box mb={'1rem'}>
				<Label text={'Delivery address'} styles={{ marginTop: '0.5rem' }} />
				<Input
					required
					fullWidth
					type={'text'}
					minLength={8}
					register={register}
					fieldName={'userAddress'}
					error={errors.userAddress !== undefined}
					placeholder={'Weligama, W 15'}
					requiredMessage={'Please write your address'}
					minLengthMessage={'The address is too short'}
				/>
				{errors.userAddress?.type !== 'required' && <ErrorText text={errors.userAddress?.message} />}
			</Box>

			<Label text={'Hotel'} />
			<Input fullWidth type={'text'} register={register} placeholder={'Hotel'} fieldName={'userHotel'} />

			{!isUserAgentTelegram && <LoaderButton isMainButton text={'Order'} handleClick={onSubmit} />}
		</form>
	);
};
