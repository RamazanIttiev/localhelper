import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { RestaurantSkeleton } from 'components/restaurantSkeleton';

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
		<Container sx={{ pt: 2, pb: 4 }} maxWidth={'sm'}>
			{restaurants ? (
				[...restaurants]
					.sort(a => (a.isWorking ? -1 : 1))
					.map(restaurant => {
						return <RestaurantCard key={restaurant.title} restaurant={restaurant} />;
					})
			) : (
				<RestaurantSkeleton />
			)}
		</Container>
	);
};
