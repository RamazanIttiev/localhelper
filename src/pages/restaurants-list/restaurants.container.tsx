import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import { RestaurantSkeleton } from 'components/skeletons/restaurantSkeleton';

import { restaurantsQuery } from 'api/airtable/restaurant';

import { hideMainButton } from 'actions/webApp-actions';

import { RestaurantCard } from './restaurant-card';

export const RestaurantsListContainer = () => {
	const { restaurantId } = useParams();
	const { data: restaurants } = useQuery(restaurantsQuery(restaurantId));

	useEffect(() => {
		hideMainButton();
	}, []);

	return (
		<Container sx={{ pt: 2, pb: 5 }} maxWidth={'sm'}>
			<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
				{restaurants ? (
					[...restaurants]
						.sort(a => (a.isWorking ? -1 : 1))
						.map(restaurant => {
							return (
								<Grid item xs={12} md={12} key={restaurant.id}>
									<RestaurantCard key={restaurant.title} restaurant={restaurant} />
								</Grid>
							);
						})
				) : (
					<RestaurantSkeleton />
				)}
			</Grid>
		</Container>
	);
};
