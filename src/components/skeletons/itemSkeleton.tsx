import { Box, Grid, Skeleton } from '@mui/material';

import { theme } from 'theme/theme';

export const ItemSkeleton = () => {
	const background = {
		backgroundColor: theme.tg_theme.palette.bg_color,
	};

	return (
		<>
			{Array.from(new Array(6)).map((item, index) => (
				<Grid item xs={6} md={5} key={index}>
					<Skeleton
						variant="rectangular"
						width={'100%'}
						sx={{ borderRadius: theme.tg_theme.borderRadius.base, height: '11rem', ...background }}
					/>
					<Box sx={{ pt: 0.5 }}>
						<Skeleton sx={{ borderRadius: '0.5rem', ...background }} />
						<Skeleton sx={{ borderRadius: '0.5rem', ...background }} width="60%" />
					</Box>
				</Grid>
			))}
		</>
	);
};
