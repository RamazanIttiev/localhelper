import React from 'react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { EntityGroup } from 'reactkit/entityGroup';
import { ErrorText } from 'reactkit/errorText';
import { Input } from 'reactkit/input';
import { Select } from 'reactkit/select';

import { FormControl } from '@mui/material';

import { DatePickerComponent } from 'components/datePicker/datePicker.component';
import 'components/datePicker/datePicker.css';

import { TransferFormFields } from '../transfer-checkout.model';

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
									fieldName={'userName'}
									requiredMessage={'Name is required'}
									pattern={/^[a-zA-Z]+$/}
									patternMessage={"I guess that's not a valid name..."}
									error={errors.userName !== undefined}
									placeholder={'John'}
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
									fieldName={'userPhone'}
									error={errors.userPhone !== undefined}
									placeholder={'8 999 777 03 02'}
									pattern={/^[0-9+-]+$/}
									minLength={8}
									requiredMessage={'I need your phone number'}
									minLengthMessage={'Your phone number is too short'}
									patternMessage={"I think your phone number isn't correct..."}
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
