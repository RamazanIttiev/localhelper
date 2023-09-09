import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintTitle } from 'reactkit/hintTitle';
import { Input } from 'reactkit/input';
import { LoaderButton } from 'reactkit/loaderButton';

import { UserData } from 'models/user.model';

import { isUserAgentTelegram } from 'utils/deviceInfo';

interface FormUIProps {
	onSubmit: () => void;
	errors: FieldErrors<UserData>;
	register: UseFormRegister<UserData>;
}

export const FormUI = ({ register, errors, onSubmit }: FormUIProps) => {
	return (
		<>
			<form>
				<HintTitle text={'Contacts'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.userName !== undefined}
					placeholder={errors.userName?.type === 'required' ? errors.userName.message : 'Name'}
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
				{errors.userName?.type !== 'required' && <ErrorText text={errors.userName?.message} />}

				<Input
					fullWidth
					type={'tel'}
					margin="dense"
					color={'info'}
					error={errors.userPhone !== undefined}
					placeholder={errors.userPhone?.type === 'required' ? errors.userPhone.message : 'Phone'}
					{...register('userPhone', {
						required: { value: true, message: 'I need your phone number' },
						pattern: { value: /^[0-9+-]+$/, message: "I think your phone number isn't correct..." },
						minLength: { value: 8, message: 'Your phone number is too short' },
					})}
				/>
				{errors.userPhone?.type !== 'required' && <ErrorText text={errors.userPhone?.message} />}

				<HintTitle text={'Delivery address'} styles={{ marginTop: '0.5rem' }} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.userAddress !== undefined}
					placeholder={errors.userAddress?.type === 'required' ? errors.userAddress.message : 'Address'}
					{...register('userAddress', {
						required: { value: true, message: 'Please write your address' },
						minLength: { value: 8, message: 'The address is too short' },
					})}
				/>
				{errors.userAddress?.type !== 'required' && <ErrorText text={errors.userAddress?.message} />}

				<Input
					fullWidth
					type={'text'}
					color={'info'}
					margin="dense"
					placeholder={'Hotel'}
					{...register('userHotel', { required: false })}
				/>

				{!isUserAgentTelegram && <LoaderButton isMainButton text={'Order'} handleClick={onSubmit} />}
			</form>
		</>
	);
};
