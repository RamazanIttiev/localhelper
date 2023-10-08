import { Grid, Skeleton } from '@mui/material';

import { theme } from 'theme/theme';

export const ProfileSkeleton = () => (
	<Grid item xs={11} md={5}>
		<Skeleton
			variant="rectangular"
			width={'100%'}
			sx={{
				height: '56px',
				borderRadius: theme.tg_theme.borderRadius.base,
				backgroundColor: theme.tg_theme.palette.bg_color,
			}}
		/>
	</Grid>
);
