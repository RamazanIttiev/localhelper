import React from 'react';

import { Box, SxProps } from '@mui/material';

import { theme } from 'theme/theme';

interface Props {
	sx?: SxProps;
}

export const Separator = ({ sx }: Props) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '2px',
				background: theme.tg_theme.palette.hint_color,
				...sx,
			}}
		/>
	);
};
