import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { RestaurantsUI } from './restaurants.component';
import { useReactRouter } from '../../hooks/useReactRouter';
import { hideMainButton } from '../../actions/webApp-actions';

export const RestaurantsContainer = () => {
	const { category } = useReactRouter();

	useEffect(() => {
		hideMainButton();
	}, []);

	return (
		<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
			{category.Restaurants !== undefined &&
				category.Restaurants.map(restaurant => {
					return <RestaurantsUI key={restaurant.Title} restaurant={restaurant} />;
				})}
		</Container>
	);
};
