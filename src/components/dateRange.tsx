import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintText } from 'reactkit/hintText';
import { StyledInput } from 'reactkit/input';

import { Box, FormControl } from '@mui/material';

import { DatePickerComponent } from 'components/datePicker/datePicker.component';

import { filterPassedTime } from 'utils/date';

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
						<HintText sx={{ ml: 2 }} text={'From'} />
						<DatePickerComponent
							selected={field.value}
							onChange={date => field.onChange(date)}
							filterTime={filterPassedTime}
							dateFormat={'dd.MM.yyyy'}
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
						<HintText sx={{ ml: 2 }} text={'To'} />
						<DatePickerComponent
							selected={field.value}
							onChange={date => field.onChange(date)}
							filterTime={filterPassedTime}
							dateFormat={'dd.MM.yyyy'}
							customInput={<StyledInput />}
							placeholderText={startPlaceholderText}
						/>
						<ErrorText text={errors.endDate?.message} />
					</FormControl>
				)}
			/>
		</Box>
	);
};
