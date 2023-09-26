import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { SxProps, Typography } from '@mui/material';

interface ErrorTextProps {
	sx?: SxProps;
	text: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export const ErrorText = ({ text, sx }: ErrorTextProps) => {
	return (
		<Typography color={'error'} variant={'body2'} sx={{ ml: 2, ...sx }}>
			<>{text}</>
		</Typography>
	);
};
