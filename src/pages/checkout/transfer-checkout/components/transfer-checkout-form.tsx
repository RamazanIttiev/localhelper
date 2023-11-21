import React from 'react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormControl } from '@mui/material';

import { nameInputValidation, phoneInputValidation } from 'common/utils/validation';

import '../../../../ui/organisms/datePicker/datePicker.css';
import { TransferFormFields } from '../transfer-checkout.model';
import { ErrorText } from 'ui/atoms/errorText';
import { Input } from 'ui/atoms/input';
import { Select } from 'ui/atoms/select';
import { EntityGroup } from 'ui/molecules/entityGroup';
import { DatePickerComponent } from 'ui/organisms/datePicker/datePicker.component';

interface Props {
	errors: FieldErrors<TransferFormFields>;
	control: Control<TransferFormFields>;
	register: UseFormRegister<TransferFormFields>;
}

export const TransferCheckoutForm = ({ register, errors, control }: Props) => {
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
						label: 'from',
						element: (
							<>
								<Input
									required
									type={'text'}
									fieldName={'pointA'}
									register={register}
									pattern={/^[a-zA-Z]+$/}
									placeholder={'Weligama, W 15'}
									error={errors.pointA !== undefined}
									requiredMessage={'This field is required'}
									patternMessage={'Are you sure you are there?'}
								/>
								{errors.pointA && <ErrorText text={errors.pointA?.message} />}
							</>
						),
					},
					{
						label: 'to',
						element: (
							<>
								<Input
									required
									type={'text'}
									fieldName={'pointB'}
									register={register}
									pattern={/^[a-zA-Z]+$/}
									placeholder={'Colombo airport'}
									error={errors.pointB !== undefined}
									requiredMessage={'This field is required'}
									patternMessage={"I don't know where this place is, sorry"}
								/>
								{errors.pointB && <ErrorText text={errors.pointB?.message} />}
							</>
						),
					},
					{
						label: 'Date and Time',
						element: (
							<Controller
								control={control}
								{...register('date', {
									required: 'I have to know when to pick you up',
								})}
								render={({ field }) => (
									<FormControl variant="standard" fullWidth>
										<DatePickerComponent
											selected={field.value}
											onChange={date => field.onChange(date)}
											dateFormat="MMMM d, HH:mm"
											inputStyles={{ width: '100%' }}
											placeholderText={new Date().toLocaleDateString('en-US', {
												timeZone: 'Asia/Colombo',
												hour12: false,
											})}
										/>
										{errors.date && <ErrorText text={errors.date?.message} />}
									</FormControl>
								)}
							/>
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
				]}
			/>
		</form>
	);
};
