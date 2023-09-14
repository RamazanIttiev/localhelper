import React, { CSSProperties } from 'react';

import { Typography } from '@mui/material';

interface HintTitleProps {
	text: string;
	styles?: CSSProperties;
}

export const Label = ({ text, styles }: HintTitleProps) => {
	return (
		<Typography
			component={'label'}
			variant={'body2'}
			sx={{ filter: 'brightness(50%)', letterSpacing: '1px', ...styles }}>
			{text}
		</Typography>
	);
};
