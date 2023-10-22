import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EntityGroup } from 'reactkit/entityGroup';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';

import { RestaurantFormFields } from 'pages/checkout/restaurant-checkout/rent-checkout.model';

import { nameInputValidation, phoneInputValidation } from 'common/utils/validation';

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
						label: 'hotel',
						element: (
							<>
								<Input
									type={'text'}
									register={register}
									placeholder={'Hotel'}
									fieldName={'userHotel'}
								/>
								{errors.userHotel && <ErrorText text={errors.userHotel?.message} />}
							</>
						),
					},
				]}
			/>
		</form>
	);
};
