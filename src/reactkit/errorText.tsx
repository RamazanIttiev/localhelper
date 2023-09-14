import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { Typography } from '@mui/material';

interface ErrorTextProps {
	text: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export const ErrorText = ({ text }: ErrorTextProps) => {
	return (
		<Typography color={'error'} variant={'body2'}>
			<>{text}</>
		</Typography>
	);
};
