import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { StyledInput } from 'reactkit/input';

import { SxProps } from '@mui/material';

import { filterPassedTime } from 'utils/date';

interface Props extends ReactDatePickerProps<any, any> {
	inputStyles?: SxProps;
}

export const DatePickerComponent = (props: Props) => {
	return (
		<DatePicker
			popperClassName={'popperCss'}
			className={'react-datepicker__input-container'}
			selectsStart
			showTimeSelect={props.showTimeSelect || true}
			filterTime={filterPassedTime}
			startDate={props.startDate || new Date()}
			minDate={props.endDate || new Date()}
			timeFormat="HH:mm"
			timeIntervals={10}
			dateFormat={props.dateFormat}
			showDisabledMonthNavigation
			customInput={<StyledInput sx={{ ...props.inputStyles }} />}
			onKeyDown={event => event.preventDefault()}
			onChangeRaw={e => e.preventDefault()}
			onFocus={e => e.target.blur()}
			placeholderText={props.placeholderText}
			{...props}
		/>
	);
};
