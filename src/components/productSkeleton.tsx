import { Box, Grid, Skeleton } from '@mui/material';

const background = {
	backgroundColor: 'rgba(0, 0, 0, 0.28)',
};

export const ProductSkeleton = () => (
	<>
		{Array.from(new Array(6)).map((item, index) => (
			<Grid item xs={6} md={5} key={index}>
				<Skeleton
					variant="rectangular"
					width={'100%'}
					sx={{ borderRadius: '0.5rem', height: '11rem', ...background }}
				/>
				<Box sx={{ pt: 0.5 }}>
					<Skeleton sx={{ borderRadius: '0.5rem', ...background }} />
					<Skeleton sx={{ borderRadius: '0.5rem', ...background }} width="60%" />
				</Box>
			</Grid>
		))}
	</>
);
