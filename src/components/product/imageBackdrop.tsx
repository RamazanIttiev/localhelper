import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

export const ImageBackdrop = ({ children }: { children: ReactNode }) => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				top: 0,
				pr: '1rem',
				opacity: 0.5,
				width: '100%',
				display: 'flex',
				height: '11rem',
				alignItems: 'start',
				position: 'absolute',
				borderRadius: '1rem',
				justifyContent: 'flex-end',
				background: theme.palette.background.default,
			}}>
			{children}
		</Box>
	);
};
