import React from 'react';
import { useLocation } from 'react-router-dom';
import { ServiceUI } from './service.component';

export const ServiceContainer = () => {
	const { state } = useLocation();

	return <ServiceUI service={state} />;
};
