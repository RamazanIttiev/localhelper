import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintText } from 'reactkit/hintText';
import { StyledInput } from 'reactkit/input';
import { InputGroup } from 'reactkit/inputGroup';
import { SelectGroup } from 'reactkit/selectGroup';

import { Box } from '@mui/material';

import { DatePickerComponent } from 'components/datePicker/datePicker.component';

import { filterPassedTime } from 'utils/date';

import { ToursFormFields } from '../tours-checkout.model';

interface Props {
	errors: FieldErrors<ToursFormFields>;
	control: Control<ToursFormFields>;
	register: UseFormRegister<ToursFormFields>;
}

export const ToursCheckoutForm = ({ register, errors, control }: Props) => {
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

			<InputGroup
				label={'Pick up place'}
				errorMessage={errors.pickupPoint?.message}
				fullWidth
				type={'text'}
				register={register}
				fieldName={'pickupPoint'}
				placeholder={'Weligama, W 15'}
				error={errors.pickupPoint !== undefined}
			/>

			<Box mb={'1rem'}>
				<HintText text={'Date of the tour'} sx={{ ml: 2 }} />
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
				<ErrorText text={errors.date?.message} />
			</Box>
		</form>
	);
};
