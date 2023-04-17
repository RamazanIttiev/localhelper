import React from 'react';
import { RestaurantsUI } from './restaurants.component';
import { Container } from '@mui/material';

export const RestaurantsContainer = () => {
	return (
		<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
			<RestaurantsUI />
		</Container>
	);
};
