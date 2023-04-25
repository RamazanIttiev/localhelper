import React from 'react';
import { Container } from '@mui/material';
import { RestaurantsUI } from './restaurants.component';
import { useReactRouter } from '../../hooks/useReactRouter';

export const RestaurantsContainer = () => {
	const { category } = useReactRouter();

	return (
		<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
			{category.Restaurants !== undefined &&
				category.Restaurants.map(restaurant => {
					return <RestaurantsUI key={restaurant.Title} restaurant={restaurant} />;
				})}
		</Container>
	);
};
