import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs } from 'reactkit/tabs/tabs.component';

import { Box, Container } from '@mui/material';

import { CategoryCard } from 'pages/categories/category-card/category-card';

import { GeoLocationProps } from 'models/geolocation.model';

import { geolocationQuery } from 'api/geolocation';

import feed from 'assets/feed.avif';
import bike from 'assets/transport.webp';

import { categoriesPrimary, categoriesSecondary } from './mock/categories';

export const Categories = () => {
	const { pathname } = useLocation();
	const { data: geolocation } = useQuery<GeoLocationProps>(geolocationQuery());
	const [value, setValue] = React.useState('1');

	const isIndia = geolocation?.country_code2 === 'IN';
	const userCountry = geolocation?.country_code2;

	const handleChange = (event: React.SyntheticEvent | null, newValue: string | number | null) => {
		console.log(newValue);
		if (typeof newValue === 'string') {
			setValue(newValue);
		}
	};

	if (!geolocation) return null;

	const bikes = [
		{
			id: '1',
			title: 'Honda 1',
			image: bike,
		},
		{
			id: '2',
			title: 'Honda 2',
			image: bike,
		},
	];

	return (
		<Container maxWidth={'md'} sx={{ pb: 1 }}>
			<Tabs value={value} onChange={handleChange} tabs={bikes} />
			<Box
				sx={{
					pt: pathname === '/' ? 3 : 0,
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}>
				{!isIndia &&
					categoriesPrimary.map(({ title, image, flowId, isLink, sx }) => {
						return (
							<CategoryCard
								sx={sx}
								key={title}
								title={title}
								image={image}
								flowId={flowId}
								isLink={isLink}
								userCountry={userCountry}
							/>
						);
					})}
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}>
				{!isIndia &&
					categoriesSecondary.map(({ title, image, flowId, isLink, sx, imageSx }) => {
						return (
							<CategoryCard
								sx={sx}
								key={title}
								title={title}
								image={image}
								flowId={flowId}
								isLink={isLink}
								imageSx={imageSx}
								secondary={true}
								userCountry={userCountry}
							/>
						);
					})}
			</Box>

			<CategoryCard
				title={'Feed'}
				image={feed}
				flowId={'flowId'}
				isLink={true}
				sx={{ pr: '16px' }}
				imageSx={{ height: '3rem' }}
			/>
		</Container>
	);
};
