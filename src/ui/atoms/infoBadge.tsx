import React from 'react';

import { SxProps } from '@mui/material';
import Typography from '@mui/material/Typography';

import { theme } from 'ui/theme/theme.ts';

interface InfoBadgeProps {
	text: string;
	sx?: SxProps;
}

export const InfoBadge = ({ text, sx }: InfoBadgeProps) => {
	return (
		<Typography
			variant="body2"
			sx={{
				fontWeight: 700,
				padding: '4px 8px',
				width: 'fit-content',
				fontSize: theme.tg_theme.fontSize.caption,
				borderRadius: theme.tg_theme.borderRadius.actionButton,
				color: theme.tg_theme.palette.button_text_color,
				background: theme.tg_theme.palette.button_color,
				...sx,
			}}>
			{text}
		</Typography>
	);
};
