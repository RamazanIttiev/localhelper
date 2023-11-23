import React from 'react';

import { Grid, Skeleton } from '@mui/material';

import { theme } from 'ui/theme/theme';

export const TabsSkeleton = () => {
	return (
		<Grid container sx={{ display: 'flex', overflow: 'auto', flexWrap: 'nowrap', mt: 4 }}>
			{Array.from(new Array(4)).map((item, index) => (
				<Grid item key={index}>
					<Skeleton
						variant="rectangular"
						sx={{
							borderRadius: theme.tg_theme.borderRadius.base,
							height: '96px',
							width: '96px',
							mr: 1,
						}}
					/>
				</Grid>
			))}
		</Grid>
	);
};
