import React from 'react';

import { Input } from './input';
import { Box } from '@mui/material';
import { HintTitle } from './hintTitle';
import { ErrorText } from './errorText';
import { TransportCheckoutModel } from '../pages/transportCheckout/transportCheckout.model';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	errors: FieldErrors<TransportCheckoutModel>;
	control: Control<TransportCheckoutModel>;
	register: UseFormRegister<TransportCheckoutModel>;
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
			<Box mr={1}>
				<HintTitle text={'From'} styles={{ marginBottom: '0.5rem' }} />
				<Controller
					control={control}
					{...register('startDate', {
						required: startValidationText,
					})}
					render={({ field }) => (
						<DatePicker
							selected={field.value}
							onChange={date => field.onChange(date)}
							selectsStart
							startDate={startDate}
							endDate={endDate}
							minDate={new Date()}
							dateFormat={'dd.MM.yyyy'}
							showDisabledMonthNavigation
							customInput={<Input fullWidth inputProps={{ readOnly: true }} />}
							placeholderText={startPlaceholderText}
						/>
					)}
				/>
				<ErrorText text={errors.startDate?.message} />
			</Box>

			<Box>
				<HintTitle text={'To'} styles={{ marginBottom: '0.5rem' }} />
				<Controller
					control={control}
					{...register('endDate', {
						required: endValidationText,
					})}
					render={({ field }) => (
						<DatePicker
							selected={field.value}
							onChange={date => field.onChange(date)}
							selectsEnd
							endDate={endDate}
							minDate={startDate}
							dateFormat={'dd.MM.yyyy'}
							showDisabledMonthNavigation
							customInput={<Input fullWidth inputProps={{ readOnly: true }} />}
							placeholderText={endPlaceholderText}
						/>
					)}
				/>
				<ErrorText text={errors.endDate?.message} />
			</Box>
		</Box>
	);
};