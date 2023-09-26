import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintText } from 'reactkit/hintText';
import { StyledInput } from 'reactkit/input';
import { InputGroup } from 'reactkit/inputGroup';
import { Select } from 'reactkit/select';
import { SelectGroup } from 'reactkit/selectGroup';

import { Box, FormControl } from '@mui/material';

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
			<InputGroup
				label={'Name'}
				errorMessage={errors.userName?.message}
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

			<InputGroup
				label={'Phone'}
				errorMessage={errors.userPhone?.message}
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

			<InputGroup
				label={'From'}
				errorMessage={errors.pointA?.message}
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

			<InputGroup
				label={'To'}
				errorMessage={errors.pointB?.message}
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

			<Controller
				control={control}
				{...register('date', {
					required: 'I have to know when to pick you up',
				})}
				render={({ field }) => (
					<FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
						<HintText text={'Date and Time'} sx={{ ml: 2 }} />
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
							customInput={<StyledInput fullWidth />}
							onFocus={e => e.target.blur()}
							placeholderText={new Date().toLocaleDateString('en-US', {
								timeZone: 'Asia/Colombo',
								hour12: false,
							})}
						/>
						{errors.date?.type !== 'required' && <ErrorText text={errors.date?.message} />}
					</FormControl>
				)}
			/>

			<SelectGroup
				label={'Passengers'}
				type={'number'}
				defaultValue={3}
				register={register}
				fieldName={'passengers'}
				options={[1, 2, 3, 4, 5, 6, 7, 8]}
				error={errors.passengers !== undefined}
				errorMessage={errors.passengers?.message}
			/>
		</form>
	);
};
