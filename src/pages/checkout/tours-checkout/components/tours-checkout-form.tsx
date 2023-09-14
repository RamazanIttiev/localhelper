import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { Input, StyledInput } from 'reactkit/input';
import { Label } from 'reactkit/label';
import { Select } from 'reactkit/select';

import { Box } from '@mui/material';

import { ToursCheckoutModel } from '../tours-checkout.model';

interface Props {
	errors: FieldErrors<ToursCheckoutModel>;
	control: Control<ToursCheckoutModel>;
	register: UseFormRegister<ToursCheckoutModel>;
}

export const ToursCheckoutForm = ({ register, errors, control }: Props) => {
	return (
		<form>
			<Box mb={'1rem'}>
				<Label text={'Name'} />
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
				<ErrorText text={errors.userName?.message} />
			</Box>

			<Box mb={'1rem'}>
				<Label text={'Phone'} />
				<Input
					required
					fullWidth
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
				<ErrorText text={errors.userPhone?.message} />
			</Box>

			<Box mb={'1rem'}>
				<Label text={'Passengers'} styles={{ marginBottom: '0.5rem' }} />
				<Select
					type={'number'}
					defaultValue={3}
					register={register}
					fieldName={'passengers'}
					options={[1, 2, 3, 4, 5, 6, 7, 8]}
					error={errors.passengers !== undefined}
				/>
				{errors.passengers?.type !== 'required' && <ErrorText text={errors.passengers?.message} />}
			</Box>

			<Box mb={'1rem'}>
				<Label text={'Pick up place'} />
				<Input
					fullWidth
					type={'text'}
					register={register}
					fieldName={'pickupPoint'}
					placeholder={'Weligama, W 15'}
					error={errors.pickupPoint !== undefined}
				/>
			</Box>

			<Box mb={'1rem'}>
				<Label text={'Date of the tour'} styles={{ marginBottom: '0.5rem' }} />
				<Controller
					control={control}
					{...register('date', {
						required: 'When do you want to go to the tour?',
					})}
					render={({ field }) => (
						<DatePicker
							wrapperClassName="datepicker"
							selected={field.value}
							onChange={date => field.onChange(date)}
							selectsStart
							startDate={new Date()}
							minDate={new Date()}
							timeIntervals={10}
							dateFormat="MMMM d"
							showDisabledMonthNavigation
							customInput={<StyledInput fullWidth />}
							placeholderText={new Date().toLocaleDateString('en-US', {
								timeZone: 'Asia/Colombo',
								hour12: false,
							})}
						/>
					)}
				/>
				{errors.date?.type !== 'required' && <ErrorText text={errors.date?.message} />}
			</Box>
		</form>
	);
};
