import React from 'react';
import { Link } from 'react-router-dom';
import { setHaptic } from '../../actions/webApp-actions';
import { RestaurantModel } from '../../models/productModel';
import { WorkingStatus } from '../../reactkit/workingStatus';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useRestaurant } from '../../utils/restaurant';

interface RestaurantsUIProps {
	restaurant: RestaurantModel;
}

export const RestaurantsUI = ({ restaurant }: RestaurantsUIProps) => {
	const { workingStatus, workingTime } = useRestaurant(restaurant);

	return (
		<Card
			onClick={() => setHaptic('light')}
			sx={{
				pb: 2,
				display: 'flex',
				height: 'auto',
				boxShadow: 'none',
				minHeight: '16rem',
				flexDirection: 'column',
				background: 'transparent',
				justifyContent: 'space-between',
			}}>
			<Link to={`${restaurant.Title}`} style={{ position: 'relative' }}>
				<CardMedia
					component="img"
					image={restaurant.Image[0].url}
					sx={{ height: '11rem', borderRadius: '2rem' }}
				/>

				<CardContent
					sx={{
						'&:last-child': { pb: 0 },
						p: 0,
						mt: '1rem',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Typography
						sx={{
							m: 0,
							display: 'flex',
							fontWeight: '600',
							alignItems: 'center',
							justifyContent: 'center',
							textTransform: 'capitalize',
						}}
						component="h3"
						variant={'subtitle1'}>
						{restaurant.Title}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<WorkingStatus workingStatus={workingStatus} workingTime={workingTime} />
					</Box>
				</CardContent>
			</Link>
		</Card>
	);
};
