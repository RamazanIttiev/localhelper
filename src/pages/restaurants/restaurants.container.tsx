import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { RestaurantsUI } from './restaurants.component';
import { hideMainButton } from '../../actions/webApp-actions';
import { useLoaderData } from 'react-router-dom';
import { AppData } from '../../models/product.model';

export const RestaurantsContainer = () => {
	const { restaurants } = useLoaderData() as AppData;

	useEffect(() => {
		hideMainButton();
	}, []);

	return (
		<Container sx={{ pt: 2 }} maxWidth={'sm'}>
			{[...restaurants]
				.sort(a => (a.isWorking ? -1 : 1))
				.map(restaurant => {
					return <RestaurantsUI key={restaurant.title} restaurant={restaurant} />;
				})}
		</Container>
	);
};
