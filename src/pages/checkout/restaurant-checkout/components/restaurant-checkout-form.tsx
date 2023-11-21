import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { RestaurantFormFields } from 'pages/checkout/restaurant-checkout/rent-checkout.model';

import { addressValidation, nameInputValidation } from 'common/utils/validation';

import { ErrorText } from 'ui/atoms/errorText';
import { Input } from 'ui/atoms/input';
import { EntityGroup } from 'ui/molecules/entityGroup';

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
