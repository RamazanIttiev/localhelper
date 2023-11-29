import { FieldErrors, Control, UseFormRegister } from 'react-hook-form';

import { BikesFormFields } from 'pages/bikes/domain/model/bikes.model.ts';

import { nameInputValidation, phoneInputValidation, dateRangeValidation } from 'common/utils/validation.ts';

import { ErrorText } from 'ui/atoms/errorText.tsx';
import { Input } from 'ui/atoms/input.tsx';
import { EntityGroup } from 'ui/molecules/entityGroup.tsx';
import { DateRange } from 'ui/organisms/dateRange.tsx';

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
