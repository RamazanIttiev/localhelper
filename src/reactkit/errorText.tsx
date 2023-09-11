import React from 'react';

import { Typography } from '@mui/material';

interface ErrorTextProps {
	text: string | undefined;
}

export const ErrorText = ({ text }: ErrorTextProps) => {
	return (
		<Typography color={'error'} variant={'body2'}>
			{text}
		</Typography>
	);
};
