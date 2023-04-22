import React from 'react';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ServicesUI } from './services.component';
import { getCurrentActivity } from './utils/service';
import { ServiceModel } from '../../components/service/models/service';

export const ServicesContainer = () => {
	const { categoryId } = useParams();
	const currentService = getCurrentActivity(categoryId);

	return (
		<Container sx={{ pt: 2, pb: 11 }} maxWidth={'md'}>
			{currentService.map(({ title, image }: ServiceModel) => {
				return <ServicesUI title={title} image={image} />;
			})}
		</Container>
	);
};
