import React from 'react';
import { useParams } from 'react-router-dom';

import { BikesContainer } from 'pages/bikes/presentation/bikes/bikes.container';
import { ItemsContainer } from 'pages/items/presentation/items/items.container';

export const CategoryContainer = () => {
	const { categoryId } = useParams();

	switch (categoryId) {
		case 'bikes':
			return <BikesContainer />;
		default:
			return <ItemsContainer />;
	}
};
