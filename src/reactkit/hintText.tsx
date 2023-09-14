import React, { CSSProperties } from 'react';

import { Typography } from '@mui/material';

interface Props {
	text: string;
	sx?: CSSProperties;
}

export const HintText = ({ text, sx }: Props) => {
	return (
		<Typography variant={'body2'} sx={{ filter: 'brightness(50%)', letterSpacing: '1px', ...sx }}>
			{text}
		</Typography>
	);
};
