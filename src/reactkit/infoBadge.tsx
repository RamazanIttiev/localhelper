import React from 'react';
import { Typography, useTheme } from '@mui/material';

interface InfoBadgeProps {
	text: string;
}

export const InfoBadge = ({ text }: InfoBadgeProps) => {
	const theme = useTheme();

	return (
		<Typography
			variant="body2"
			sx={{
				padding: '0.5rem',
				width: 'fit-content',
				borderRadius: '1rem',
				background: theme.palette.background.paper,
			}}>
			{text}
		</Typography>
	);
};
