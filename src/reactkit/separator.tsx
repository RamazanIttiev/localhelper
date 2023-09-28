import React from 'react';

import { Box } from '@mui/material';

import { theme } from 'theme';

export const Separator = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '2px',
				background: theme.tg_theme.palette.hint_color,
			}}
		/>
	);
};
