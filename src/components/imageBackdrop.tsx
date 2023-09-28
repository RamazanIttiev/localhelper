import React, { ReactNode } from 'react';

import { Box } from '@mui/material';

import { theme } from 'theme/theme';

export const ImageBackdrop = ({ children }: { children: ReactNode }) => {
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
				borderRadius: theme.tg_theme.borderRadius.base,
				justifyContent: 'flex-end',
				background: theme.palette.background.default,
			}}>
			{children}
		</Box>
	);
};
