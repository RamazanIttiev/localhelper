import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { theme } from 'ui/theme/theme.ts';

export const RestaurantSkeleton = () => (
	<>
		{Array.from(new Array(4)).map((item, index) => (
			<Grid item xs={12} md={12} key={index} sx={{ mb: '1rem' }}>
				<Skeleton
					variant="rectangular"
					width={'100%'}
					sx={{
						height: '11rem',
						borderRadius: theme.tg_theme.borderRadius.base,
						backgroundColor: theme.tg_theme.palette.bg_color,
					}}
				/>
			</Grid>
		))}
	</>
);
