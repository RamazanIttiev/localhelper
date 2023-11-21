import React from 'react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

import { filterPassedTime } from 'common/utils/date';
import { nameInputValidation, phoneInputValidation } from 'common/utils/validation';

import { ToursFormFields } from '../tours-checkout.model';
import { ErrorText } from 'ui/atoms/errorText';
import { Input } from 'ui/atoms/input';
import { Select } from 'ui/atoms/select';
import { EntityGroup } from 'ui/molecules/entityGroup';
import { DatePickerComponent } from 'ui/organisms/datePicker/datePicker.component';

interface Props {
	errors: FieldErrors<ToursFormFields>;
	control: Control<ToursFormFields>;
	register: UseFormRegister<ToursFormFields>;
}

export const ToursCheckoutForm = ({ register, errors, control }: Props) => {
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
						label: 'passengers',
						element: (
							<>
								<Select
									type={'number'}
									defaultValue={3}
									register={register}
									fieldName={'passengers'}
									options={[1, 2, 3, 4, 5, 6, 7, 8]}
									error={errors.passengers !== undefined}
								/>
								{errors.passengers && <ErrorText text={errors.passengers?.message} />}
							</>
						),
					},
					{
						label: 'from',
						element: (
							<>
								<Input
									type={'text'}
									register={register}
									fieldName={'pickupPoint'}
									placeholder={'Weligama, W 15'}
									error={errors.pickupPoint !== undefined}
								/>
								{errors.pickupPoint && <ErrorText text={errors.pickupPoint?.message} />}
							</>
						),
					},
					{
						label: 'Date of the tour',
						element: (
							<Controller
								control={control}
								{...register('date', {
									required: 'When do you want to go to the tour?',
								})}
								render={({ field }) => (
									<DatePickerComponent
										selected={field.value}
										onChange={date => field.onChange(date)}
										filterTime={filterPassedTime}
										dateFormat="MMMM d"
										inputStyles={{ width: '100%' }}
										placeholderText={new Date().toLocaleDateString('en-US', {
											timeZone: 'Asia/Colombo',
											hour12: false,
										})}
									/>
								)}
							/>
						),
					},
				]}
			/>
		</form>
	);
};
