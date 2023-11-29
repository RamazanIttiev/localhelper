import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { nameInputValidation, addressValidation } from 'common/utils/validation.ts';

import { RestaurantFormFields } from '../rent-checkout.model.ts';
import { ErrorText } from 'ui/atoms/errorText.tsx';
import { Input } from 'ui/atoms/input.tsx';
import { EntityGroup } from 'ui/molecules/entityGroup.tsx';

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
