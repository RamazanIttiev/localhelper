import React, { CSSProperties } from 'react';
import { Typography } from '@mui/material';

interface FromGroupTitleProps {
	text: string;
	styles?: CSSProperties;
}

export const FormGroupTitle = ({ text, styles }: FromGroupTitleProps) => {
	return (
		<Typography variant={'body2'} sx={{ filter: 'brightness(50%)', letterSpacing: '1px', ...styles }}>
			{text}
		</Typography>
	);
};
