import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EntityGroup } from 'reactkit/entityGroup';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';

import { RestaurantFormFields } from 'pages/checkout/restaurant-checkout/rent-checkout.model';

import { addressValidation, nameInputValidation } from 'common/utils/validation';

interface FormUIProps {
	errors: FieldErrors<RestaurantFormFields>;
	register: UseFormRegister<RestaurantFormFields>;
}

export const RestaurantCheckoutForm = ({ register, errors }: FormUIProps) => {
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
						label: 'address',
						element: (
							<>
								<Input type={'text'} register={register} {...addressValidation} />
								{errors.userAddress && <ErrorText text={errors.userAddress?.message} />}
							</>
						),
					},
				]}
			/>
		</form>
	);
};
