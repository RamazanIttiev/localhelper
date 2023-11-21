import React from 'react';

import { SxProps, Typography } from '@mui/material';

import { theme } from '../theme/theme';

interface Props {
	text: string;
	sx?: SxProps;
}

export const HintText = ({ text, sx }: Props) => {
	return (
		<Typography
			sx={{
				textTransform: 'uppercase',
				color: theme.tg_theme.palette.hint_color,
				fontSize: theme.tg_theme.fontSize.caption,
				...sx,
			}}>
			{text}
		</Typography>
	);
};
