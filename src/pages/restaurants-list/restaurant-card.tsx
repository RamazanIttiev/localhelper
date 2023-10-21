import React from 'react';
import { Link } from 'react-router-dom';
import { WorkingStatus } from 'reactkit/workingStatus';

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

import { Restaurant } from 'pages/restaurant/restaurant.model';

import { theme } from 'theme/theme';

interface Props {
	restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: Props) => {
	return (
		<Card
			sx={{
				mb: 2,
				display: 'flex',
				height: 'auto',
				boxShadow: 'none',
				flexDirection: 'column',
				background: 'transparent',
				justifyContent: 'space-between',
			}}>
			<Link to={`${restaurant.title}`} state={{ item: restaurant }} style={{ position: 'relative' }}>
				<CardMedia
					component="img"
					image={restaurant.image[0].url}
					sx={{ height: '11rem', borderRadius: theme.tg_theme.borderRadius.base }}
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
						variant={'subtitle2'}>
						{restaurant.title}
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<WorkingStatus workingStatus={restaurant.workingStatus} workingTime={restaurant.workingTime} />
					</Box>
				</CardContent>
			</Link>
		</Card>
	);
};
