import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintTitle } from 'reactkit/hintTitle';
import { Input } from 'reactkit/input';

import { Box } from '@mui/material';

import { BikesCheckoutModel } from 'pages/bikes-checkout/bikes-checkout.model';

interface Props {
	errors: FieldErrors<BikesCheckoutModel>;
	control: Control<BikesCheckoutModel>;
	register: UseFormRegister<BikesCheckoutModel>;
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
							customInput={<Input fullWidth />}
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
							customInput={<Input fullWidth />}
							placeholderText={endPlaceholderText}
						/>
					)}
				/>
				<ErrorText text={errors.endDate?.message} />
			</Box>
		</Box>
	);
};
