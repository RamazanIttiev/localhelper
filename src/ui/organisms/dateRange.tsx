import { Box, FormControl } from "@mui/material";
import { filterPassedTime } from "common/utils/date.ts";
import { ReactDatePickerProps } from "react-datepicker";
import { FieldErrors, Control, UseFormRegister, useWatch, Controller } from "react-hook-form";
import { ErrorText } from "ui/atoms/errorText.tsx";
import { StyledInput } from "ui/atoms/input.tsx";
import { DatePickerComponent } from "./datePicker/datePicker.component.tsx";

interface Props extends Partial<ReactDatePickerProps<any, any>> {
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
	startValidationText,
	startPlaceholderText,
	endPlaceholderText,
	showTimeSelect,
	...props
}: Props) => {
	const startDate = useWatch({ control, name: 'startDate' });
	const endDate = useWatch({ control, name: 'endDate' });

	return (
		<Box sx={{ display: 'flex', borderRadius: 'inherit' }}>
			<Controller
				control={control}
				{...register('startDate', {
					required: startValidationText,
				})}
				render={({ field }) => (
					<FormControl variant="standard" fullWidth sx={{ mr: 1, borderRadius: 'inherit' }}>
						<DatePickerComponent
							{...props}
							selected={field.value}
							showTimeSelect={showTimeSelect}
							onChange={date => field.onChange(date)}
							filterTime={filterPassedTime}
							dateFormat={'dd.MM.yyyy'}
							selectsStart
							onChangeRaw={e => e.preventDefault()}
							startDate={startDate}
							endDate={endDate}
							minDate={new Date()}
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
					<FormControl variant="standard" fullWidth sx={{ borderRadius: 'inherit' }}>
						<DatePickerComponent
							{...props}
							selected={field.value}
							showTimeSelect={showTimeSelect}
							onChange={date => field.onChange(date)}
							filterTime={filterPassedTime}
							dateFormat={'dd.MM.yyyy'}
							selectsEnd
							endDate={endDate}
							minDate={startDate}
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
