import { Box, Grid, Skeleton } from '@mui/material';

const background = {
	backgroundColor: 'rgba(0, 0, 0, 0.28)',
};
export const SkeletonLoader = () => (
	<>
		{Array.from(new Array(6)).map((item, index) => (
			<Grid item xs={6} md={5} key={index} minHeight={'296px'}>
				<Skeleton sx={background} variant="rectangular" width={'100%'} height={232} />
				<Box sx={{ pt: 0.5 }}>
					<Skeleton sx={background} />
					<Skeleton sx={background} width="60%" />
				</Box>
			</Grid>
		))}
	</>
);
