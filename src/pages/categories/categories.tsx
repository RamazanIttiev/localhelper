import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Container } from '@mui/material';

import { CategoryCard } from 'pages/categories/category-card/category-card';

import { GeoLocationProps } from 'common/models/geolocation.model';

import { geolocationQuery } from 'api/geolocation';

import feed from 'assets/feed.avif';

import { categoriesPrimary, categoriesSecondary } from './mock/categories';

export const Categories = () => {
	const { pathname } = useLocation();
	const { data: geolocation } = useQuery<GeoLocationProps>(geolocationQuery());

	const isIndia = geolocation?.country_code2 === 'IN';
	const userCountry = geolocation?.country_code2;

	if (!geolocation) return null;

	return (
		<Container maxWidth={'md'} sx={{ pb: 1 }}>
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
