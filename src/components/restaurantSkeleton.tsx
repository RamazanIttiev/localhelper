import { Grid, Skeleton } from '@mui/material';

export const RestaurantSkeleton = () => (
	<>
		{Array.from(new Array(4)).map((item, index) => (
			<Grid item xs={12} md={12} key={index} sx={{ mb: '1rem' }}>
				<Skeleton
					variant="rectangular"
					width={'100%'}
					sx={{ borderRadius: '0.5rem', height: '11rem', backgroundColor: 'rgba(0, 0, 0, 0.28)' }}
				/>
			</Grid>
		))}
	</>
);
