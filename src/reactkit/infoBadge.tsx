import React, { CSSProperties } from 'react';

import { Typography, useTheme } from '@mui/material';

interface InfoBadgeProps {
	text: string;
	sx?: CSSProperties;
}

export const InfoBadge = ({ text, sx }: InfoBadgeProps) => {
	const theme = useTheme();

	return (
		<Typography
			variant="body2"
			sx={{
				fontWeight: 700,
				padding: '0.3rem 0.6rem',
				width: 'fit-content',
				borderRadius: '1rem',
				background: theme.palette.background.paper,
				...sx,
			}}>
			{text}
		</Typography>
	);
};
