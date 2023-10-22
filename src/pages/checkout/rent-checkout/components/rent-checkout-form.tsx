import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { EntityGroup } from 'reactkit/entityGroup';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';

import { DateRange } from 'components/dateRange';

import { dateRangeValidation, nameInputValidation, phoneInputValidation } from 'common/utils/validation';

import { RentFormFields } from '../rent-checkout.model';

interface Props {
	errors: FieldErrors<RentFormFields>;
	control: Control<RentFormFields>;
	register: UseFormRegister<RentFormFields>;
}

export const RentCheckoutForm = ({ register, errors, control }: Props) => {
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
						label: 'period',
						element: (
							<DateRange control={control} register={register} errors={errors} {...dateRangeValidation} />
						),
					},
				]}
			/>
		</form>
	);
};
