import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintTitle } from 'reactkit/hintTitle';
import { Input } from 'reactkit/input';
import { Select } from 'reactkit/seclect';

import { Box, MenuItem } from '@mui/material';

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
				<HintTitle text={'Name'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.userName !== undefined}
					placeholder={'John'}
					{...register('userName', {
						required: {
							value: true,
							message: 'Name is required',
						},
						pattern: {
							value: /^[a-zA-Z]+$/,
							message: "I guess that's not a valid name...",
						},
					})}
				/>
				<ErrorText text={errors.userName?.message} />
			</Box>

			<Box mb={'1rem'}>
				<HintTitle text={'Passengers'} styles={{ marginBottom: '0.5rem' }} />
				<Select
					fullWidth
					type={'number'}
					margin="dense"
					color={'info'}
					error={errors.passengers !== undefined}
					defaultValue={3}
					{...register('passengers', {
						required: {
							value: true,
							message: 'This field is required',
						},
					})}>
					{[1, 2, 3, 4, 5, 6, 7, 8].map(number => {
						return <MenuItem value={number}>{number}</MenuItem>;
					})}
				</Select>
				{errors.passengers?.type !== 'required' && <ErrorText text={errors.passengers?.message} />}
			</Box>

			<Box mb={'1rem'}>
				<HintTitle text={'Pick up place'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.pickupPoint !== undefined}
					placeholder={'Weligama, W 15'}
					{...register('pickupPoint')}
				/>
			</Box>

			<Box mb={'1rem'}>
				<HintTitle text={'Date of the tour'} styles={{ marginBottom: '0.5rem' }} />
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
							customInput={<Input fullWidth />}
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
