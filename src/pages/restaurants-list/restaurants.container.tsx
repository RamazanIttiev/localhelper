import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { RestaurantCard } from '../../components/restaurantCard';
import { hideMainButton } from '../../actions/webApp-actions';
import { restaurantsQuery } from '../../api/airtable/restaurant';
import { useParams } from 'react-router-dom';

export const RestaurantsListContainer = () => {
	const { restaurantId } = useParams();
	const { data: restaurants } = useQuery(restaurantsQuery(restaurantId));

	useEffect(() => {
		hideMainButton();
	}, []);

	return (
		<Container sx={{ pt: 2 }} maxWidth={'sm'}>
			{!!restaurants &&
				[...restaurants]
					.sort(a => (a.isWorking ? -1 : 1))
					.map(restaurant => {
						return <RestaurantCard key={restaurant.title} restaurant={restaurant} />;
					})}
		</Container>
	);
};
