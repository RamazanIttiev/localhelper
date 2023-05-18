import React from 'react';
import { Input } from '../checkout.styled';
import { FormGroupTitle } from './formGroupTitle';
import { ErrorType } from '../../../models/error';
import { FormInput } from '../checkout.container';
import { LoaderButton } from '../../../reactkit/loaderButton';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { isUserAgentTelegram } from '../../../utils/deviceInfo';

interface FormUIProps {
	loading: boolean;
	errorState: ErrorType;
	errors: FieldErrors<FormInput>;
	onSubmit: (data: FormInput) => void;
	register: UseFormRegister<FormInput>;
	handleSubmit: UseFormHandleSubmit<FormInput>;
}

export const FormUI = ({ handleSubmit, register, errors, onSubmit, loading, errorState }: FormUIProps) => {
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormGroupTitle text={'Contacts'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.userName !== undefined}
					placeholder={errors.userName ? 'Name is required' : 'Name'}
					{...register('userName', { required: true })}
				/>
				<Input
					autoComplete={'off'}
					fullWidth
					type={'tel'}
					margin="dense"
					color={'info'}
					error={errors.userPhone !== undefined}
					{...register('userPhone', { required: true })}
					placeholder={errors.userPhone ? 'Phone number is required' : 'Phone'}
				/>

				<FormGroupTitle text={'Delivery address'} styles={{ marginTop: '0.5rem' }} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.userAddress !== undefined}
					{...register('userAddress', { required: true })}
					placeholder={errors.userAddress ? 'Address is required' : 'Street'}
				/>

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
						handleClick={handleSubmit(onSubmit)}
					/>
				)}
			</form>
		</>
	);
};
