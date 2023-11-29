import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { nameInputValidation, phoneInputValidation, addressValidation } from 'common/utils/validation.ts';

import { FlowersFormFields } from '../flowers-checkout.model.ts';
import { ErrorText } from 'ui/atoms/errorText.tsx';
import { Input } from 'ui/atoms/input.tsx';
import { EntityGroup } from 'ui/molecules/entityGroup.tsx';

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
