import React from 'react';
import { Input } from '../checkout.styled';
import { HintTitle } from '../../../components/hintTitle';
import { ErrorType } from '../../../models/error.model';
import { LoaderButton } from '../../../reactkit/loaderButton';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { isUserAgentTelegram } from '../../../utils/deviceInfo';
import { ErrorText } from '../../../components/errorText';
import { UserData } from '../../../models/user.model';

interface FormUIProps {
	loading: boolean;
	errorState: ErrorType;
	errors: FieldErrors<UserData>;
	onSubmit: () => void;
	register: UseFormRegister<UserData>;
	handleSubmit: UseFormHandleSubmit<UserData>;
}

export const FormUI = ({ register, errors, onSubmit, loading, errorState }: FormUIProps) => {
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

				{!isUserAgentTelegram && (
					<LoaderButton
						isMainButton
						text={'Order'}
						loading={loading}
						errorState={errorState}
						handleClick={onSubmit}
					/>
				)}
			</form>
		</>
	);
};
