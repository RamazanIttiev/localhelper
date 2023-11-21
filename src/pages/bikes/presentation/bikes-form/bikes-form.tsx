import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { dateRangeValidation, nameInputValidation, phoneInputValidation } from 'common/utils/validation';

import { BikesFormFields } from '../../domain/model/bikes.model';
import { ErrorText } from 'ui/atoms/errorText';
import { Input } from 'ui/atoms/input';
import { EntityGroup } from 'ui/molecules/entityGroup';
import { DateRange } from 'ui/organisms/dateRange';

interface Props {
	errors: FieldErrors<BikesFormFields>;
	control: Control<BikesFormFields>;
	register: UseFormRegister<BikesFormFields>;
}

export const BikesCheckoutForm = ({ register, errors, control }: Props) => {
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
