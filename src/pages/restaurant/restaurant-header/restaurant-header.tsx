import React from 'react';
import { WorkingStatus } from 'reactkit/workingStatus';

import { Box, Icon, Typography } from '@mui/material';

import { theme } from 'theme';

import { Restaurant } from 'pages/restaurant/restaurant.model';

interface Props {
	restaurant: Pick<Restaurant, 'workingTime' | 'workingStatus' | 'image' | 'location' | 'title'>;
}

export const RestaurantHeader = ({ restaurant }: Props) => {
	const { title, workingStatus, workingTime, location } = restaurant;

	return (
		<>
			<Box
				component={'img'}
				src={restaurant.image[0].url}
				alt={title}
				sx={{
					display: 'block',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					width: '100%',
					objectFit: 'cover',
					height: '18rem',
				}}
			/>
			<Box
				sx={{
					top: 0,
					pb: '2rem',
					pl: '2rem',
					width: '100%',
					display: 'flex',
					height: '18rem',
					alignItems: 'flex-start',
					justifyContent: 'end',
					flexDirection: 'column',
					position: 'absolute',
					background: `linear-gradient(to bottom, rgba(255,255,255, 0), ${theme.palette.background.default})`,
				}}>
				<Typography variant={'body1'} fontSize={'2rem'}>
					{title}
				</Typography>
				<Box
					sx={{
						width: '9rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'baseline',
						justifyContent: 'space-between',
					}}>
					<Box sx={{ marginBottom: '1rem' }}>
						<WorkingStatus workingStatus={workingStatus} workingTime={workingTime} />
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
						<Icon
							fontSize={'small'}
							sx={{
								marginRight: '0.2rem',
							}}>
							location_on
						</Icon>
						<Typography component="p" variant={'body1'}>
							{location}
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};
