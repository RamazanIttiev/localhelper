import React, { CSSProperties } from 'react';

import { InputLabel, SxProps } from '@mui/material';

import { theme } from 'theme';

interface HintTitleProps {
	text: string;
	labelStyles?: SxProps;
}

export const Label = ({ text, labelStyles }: HintTitleProps) => {
	return (
		<InputLabel
			shrink
			sx={{
				ml: 2,
				position: 'static',
				lineHeight: 1,
				color: theme.tg_theme.palette.hint_color,
				fontSize: theme.tg_theme.fontSize.caption,
				textTransform: 'uppercase',
				...labelStyles,
			}}>
			{text}
		</InputLabel>
	);
};
