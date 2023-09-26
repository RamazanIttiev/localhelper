import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ErrorText } from 'reactkit/errorText';
import { HintText } from 'reactkit/hintText';
import { Input } from 'reactkit/input';

import { FormControl, OutlinedTextFieldProps, SxProps } from '@mui/material';

interface Props extends Partial<OutlinedTextFieldProps> {
	type: string;
	label: string;
	fieldName: string;
	register: UseFormRegister<any>;
	placeholder: string;
	error?: boolean;
	pattern?: RegExp;
	minLength?: string | number;
	minLengthMessage?: string;
	required?: boolean;
	fullWidth?: boolean;
	patternMessage?: string;
	requiredMessage?: string;
	defaultValue?: string | number;
	margin?: 'dense' | 'none' | undefined;
	errorMessage?: string;
	containerStyles?: SxProps;
	inputStyles?: SxProps;
	labelStyles?: SxProps;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export const InputGroup = (props: Props) => {
	const { label, errorMessage, containerStyles, labelStyles, inputStyles } = props;

	return (
		<FormControl variant="standard" fullWidth sx={{ mb: 2, ...containerStyles }}>
			<HintText text={label} sx={{ ml: 2, ...labelStyles }} />
			<Input {...props} />
			<ErrorText text={errorMessage} />
		</FormControl>
	);
};
