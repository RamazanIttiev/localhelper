import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { StyledInput } from 'reactkit/input';
import { Label } from 'reactkit/label';

import { Box, FormControl } from '@mui/material';

interface Props {
	errors: FieldErrors<any>;
	control: Control<any>;
	register: UseFormRegister<any>;
	startValidationText?: string;
	endValidationText?: string;
	startPlaceholderText?: string;
	endPlaceholderText?: string;
}

export const DateRange = ({
	errors,
	control,
	register,
	endValidationText,
	endPlaceholderText,
	startValidationText,
	startPlaceholderText,
}: Props) => {
	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	return (
		<Box display={'flex'}>
			<Controller
				control={control}
				{...register('startDate', {
					required: startValidationText,
				})}
				render={({ field }) => (
					<FormControl variant="standard" fullWidth sx={{ mr: 1 }}>
						<Label text={'From'} />
						<DatePicker
							onFocus={e => e.target.blur()}
							selected={field.value}
							onChange={date => field.onChange(date)}
							selectsStart
							onChangeRaw={e => e.preventDefault()}
							startDate={startDate}
							endDate={endDate}
							minDate={new Date()}
							dateFormat={'dd.MM.yyyy'}
							showDisabledMonthNavigation
							onKeyDown={event => {
								event.preventDefault();
							}}
							customInput={<StyledInput />}
							placeholderText={startPlaceholderText}
						/>
						<ErrorText text={errors.startDate?.message} />
					</FormControl>
				)}
			/>

			<Controller
				control={control}
				{...register('endDate', {
					required: endValidationText,
				})}
				render={({ field }) => (
					<FormControl variant="standard" fullWidth>
						<Label text={'To'} />
						<DatePicker
							onFocus={e => e.target.blur()}
							selected={field.value}
							onChange={date => field.onChange(date)}
							onChangeRaw={e => e.preventDefault()}
							selectsEnd
							endDate={endDate}
							minDate={startDate}
							dateFormat={'dd.MM.yyyy'}
							showDisabledMonthNavigation
							customInput={<StyledInput />}
							placeholderText={endPlaceholderText}
						/>
						<ErrorText text={errors.endDate?.message} />
					</FormControl>
				)}
			/>
		</Box>
	);
};
