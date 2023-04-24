import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ServicesUI } from './services.component';
import { getCurrentActivity } from './utils/service';

export const ServicesContainer = () => {
	const { categoryId } = useParams();
	const currentService = getCurrentActivity(categoryId);

	return (
		<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
			{currentService.map(({ title, image }: { title: string; image: string }) => {
				return <ServicesUI key={title} title={title} image={image} />;
			})}
		</Container>
	);
};
