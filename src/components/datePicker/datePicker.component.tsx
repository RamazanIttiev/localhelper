import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { StyledInput } from 'reactkit/input';

import { filterPassedTime } from 'utils/date';

interface Props extends ReactDatePickerProps<any, any> {}

export const DatePickerComponent = (props: Props) => {
	return (
		<DatePicker
			popperClassName={'popperCss'}
			selectsStart
			showTimeSelect
			filterTime={filterPassedTime}
			startDate={new Date()}
			minDate={new Date()}
			timeFormat="HH:mm"
			dateFormat="MMMM d, HH:mm"
			showDisabledMonthNavigation
			customInput={<StyledInput fullWidth />}
			onFocus={e => e.target.blur()}
			placeholderText={new Date().toLocaleDateString('en-US', {
				timeZone: 'Asia/Colombo',
				hour12: false,
			})}
			{...props}
		/>
	);
};
