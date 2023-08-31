import React from 'react';

import { Skeleton } from '@mui/material';

export const HeaderSkeleton = () => (
	<Skeleton
		variant="rectangular"
		sx={{
			borderBottomRightRadius: '0.5rem',
			borderBottomLeftRadius: '0.5rem',
			height: '17rem',
			backgroundColor: 'rgba(0, 0, 0, 0.28)',
		}}
	/>
);
