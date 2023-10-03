import React from 'react';

import { Skeleton } from '@mui/material';

import { theme } from 'theme/theme';

export const HeaderSkeleton = () => (
	<Skeleton
		variant="rectangular"
		sx={{
			height: '17rem',
			backgroundColor: theme.tg_theme.palette.bg_color,
			borderBottomRightRadius: theme.tg_theme.borderRadius.base,
			borderBottomLeftRadius: theme.tg_theme.borderRadius.base,
		}}
	/>
);
