import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintTitle } from 'reactkit/hintTitle';
import { Input } from 'reactkit/input';
import { Select } from 'reactkit/seclect';

import { Box, MenuItem } from '@mui/material';

import { filterPassedTime } from 'utils/date';

import { TransferCheckoutModel } from '../transfer-checkout.model';

interface Props {
	errors: FieldErrors<TransferCheckoutModel>;
	control: Control<TransferCheckoutModel>;
	register: UseFormRegister<TransferCheckoutModel>;
}

export const TransferCheckoutForm = ({ register, errors, control }: Props) => {
	return (
		<form>
			<Box mb={'2rem'}>
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
				<HintTitle text={'Phone'} />
				<Input
					fullWidth
					type={'tel'}
					margin="dense"
					color={'info'}
					error={errors.userPhone !== undefined}
					placeholder={'8 999 777 03 02'}
					{...register('userPhone', {
						required: { value: true, message: 'I need your phone number' },
						pattern: { value: /^[0-9+-]+$/, message: "I think your phone number isn't correct..." },
						minLength: { value: 8, message: 'Your phone number is too short' },
					})}
				/>
				{errors.userPhone?.type !== 'required' && <ErrorText text={errors.userPhone?.message} />}
			</Box>

			<Box mb={'2rem'}>
				<HintTitle text={'From'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.pointA !== undefined}
					placeholder={'Weligama, W 15'}
					{...register('pointA', {
						required: {
							value: true,
							message: 'This field is required',
						},
						pattern: {
							value: /^[a-zA-Z]+$/,
							message: 'Are you sure you are there?',
						},
					})}
				/>
				<ErrorText text={errors.pointA?.message} />
				<HintTitle text={'To'} />
				<Input
					fullWidth
					type={'text'}
					margin="dense"
					color={'info'}
					error={errors.pointB !== undefined}
					placeholder={'Colombo airport'}
					{...register('pointB', {
						required: {
							value: true,
							message: 'This field is required',
						},
						pattern: {
							value: /^[a-zA-Z]+$/,
							message: "I don't know where this place is, sorry",
						},
					})}
				/>
				<ErrorText text={errors.pointB?.message} />
			</Box>

			<Box mb={'2rem'}>
				<HintTitle text={'Date and Time'} styles={{ marginBottom: '0.5rem' }} />
				<Controller
					control={control}
					{...register('date', {
						required: 'I have to know when to pick you up',
					})}
					render={({ field }) => (
						<DatePicker
							wrapperClassName="datepicker"
							selected={field.value}
							onChange={date => field.onChange(date)}
							selectsStart
							showTimeSelect
							filterTime={filterPassedTime}
							startDate={new Date()}
							minDate={new Date()}
							timeIntervals={10}
							timeFormat="HH:mm"
							dateFormat="MMMM d, HH:mm"
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

			<Box mb={'2rem'}>
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
		</form>
	);
};
