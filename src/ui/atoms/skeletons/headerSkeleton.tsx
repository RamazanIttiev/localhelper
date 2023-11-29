import React from 'react';

import Skeleton from '@mui/material/Skeleton';

import { theme } from 'ui/theme/theme.ts';

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
