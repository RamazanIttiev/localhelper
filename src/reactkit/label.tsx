import React from 'react';

import { SxProps, Typography } from '@mui/material';

import { theme } from 'theme';

interface HintTitleProps {
	text: string;
	labelStyles?: SxProps;
}

export const Label = ({ text, labelStyles }: HintTitleProps) => {
	return (
		<Typography
			sx={{
				ml: 2,
				color: theme.tg_theme.palette.hint_color,
				fontSize: theme.tg_theme.fontSize.caption,
				textTransform: 'uppercase',
				...labelStyles,
			}}>
			{text}
		</Typography>
	);
};
