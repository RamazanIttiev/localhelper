import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintText } from 'reactkit/hintText';
import { Select } from 'reactkit/select';

import { FormControl, NativeSelectProps, SxProps } from '@mui/material';

interface Props extends Partial<NativeSelectProps> {
	type: string;
	label: string;
	fieldName: string;
	register: UseFormRegister<any>;
	error?: boolean;
	required?: boolean;
	fullWidth?: boolean;
	requiredMessage?: string;
	defaultValue?: string | number;
	errorMessage?: string;
	containerStyles?: SxProps;
	selectStyles?: SxProps;
	labelStyles?: SxProps;
	options: string[] | number[];
}

export const SelectGroup = (props: Props) => {
	const { label, errorMessage, containerStyles, labelStyles, selectStyles } = props;

	return (
		<FormControl variant="standard" fullWidth sx={{ mb: 2, ...containerStyles }}>
			<HintText text={label} sx={{ ml: 2, ...labelStyles }} />
			<Select {...props} sx={selectStyles} />
			<ErrorText text={errorMessage} />
		</FormControl>
	);
};
