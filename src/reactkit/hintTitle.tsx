import React, { CSSProperties } from 'react';
import { Typography } from '@mui/material';

interface HintTitleProps {
	text: string;
	styles?: CSSProperties;
}

export const HintTitle = ({ text, styles }: HintTitleProps) => {
	return (
		<Typography variant={'body2'} sx={{ filter: 'brightness(50%)', letterSpacing: '1px', ...styles }}>
			{text}
		</Typography>
	);
};
