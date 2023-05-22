import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { RestaurantsUI } from './restaurants.component';
import { useRestaurant } from '../../hooks/useRestaurant';
import { hideMainButton } from '../../actions/webApp-actions';

export const RestaurantsContainer = () => {
	const { restaurants } = useRestaurant();

	useEffect(() => {
		hideMainButton();
	}, []);

	return (
		<Container sx={{ pt: 2 }} maxWidth={'sm'}>
			{[...restaurants]
				.sort(a => (a.IsWorking ? -1 : 1))
				.map(restaurant => {
					return <RestaurantsUI key={restaurant.Title} restaurant={restaurant} />;
				})}
		</Container>
	);
};
