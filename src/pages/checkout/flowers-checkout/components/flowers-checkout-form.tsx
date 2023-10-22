import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EntityGroup } from 'reactkit/entityGroup';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';

import { addressValidation, nameInputValidation, phoneInputValidation } from 'common/utils/validation';

import { FlowersFormFields } from '../flowers-checkout.model';

interface Props {
	errors: FieldErrors<FlowersFormFields>;
	register: UseFormRegister<FlowersFormFields>;
}

export const FlowersCheckoutForm = ({ register, errors }: Props) => {
	return (
		<form>
			<EntityGroup
				children={[
					{
						label: 'name',
						element: (
							<>
								<Input
									required
									type={'text'}
									register={register}
									error={errors.userName !== undefined}
									{...nameInputValidation}
								/>
								{errors.userName && <ErrorText text={errors.userName?.message} />}
							</>
						),
					},
					{
						label: 'phone',
						element: (
							<>
								<Input
									required
									type={'tel'}
									register={register}
									error={errors.userPhone !== undefined}
									{...phoneInputValidation}
								/>
								{errors.userPhone && <ErrorText text={errors.userPhone?.message} />}
							</>
						),
					},
					{
						label: 'address',
						element: (
							<>
								<Input
									required
									type={'text'}
									register={register}
									error={errors.userAddress !== undefined}
									{...addressValidation}
								/>
								{errors.userAddress && <ErrorText text={errors.userAddress?.message} />}
							</>
						),
					},
				]}
			/>
		</form>
	);
};
