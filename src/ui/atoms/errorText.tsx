import React from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

import { SxProps, Typography } from '@mui/material';

import { theme } from '../theme/theme';

interface ErrorTextProps {
	sx?: SxProps;
	text: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export const ErrorText = ({ text, sx }: ErrorTextProps) => {
	return (
		<Typography color={'error'} fontSize={theme.tg_theme.fontSize.caption} sx={{ ...sx }}>
			<>{text}</>
		</Typography>
	);
};
