import React from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

import { CategoryCard } from 'pages/categories/category-card/category-card';

import { CountryCode } from 'common/models/geolocation.model';

import { theme } from 'ui/theme/theme';

import { categoriesPrimary } from './mock/categories';

export const Categories = () => {
	const { pathname } = useLocation();
	const { search } = useLocation();
	const userCountry = search.replace(/[?=]/g, '') as CountryCode;

	// const { data: geolocation } = useQuery<GeoLocationProps>(geolocationQuery());

	const isIndia = false;
	// const userCountry = geolocation?.country_code2;

	// if (!geolocation) return null;

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
								userCountry={'LK'}
							/>
						);
					})}

				<Box
					sx={{
						mt: 6,
						width: '100%',
						background: theme.tg_theme.palette.bg_color,
						borderRadius: theme.tg_theme.borderRadius.base,
					}}>
					<Typography sx={{ textAlign: 'center', fontWeight: '600', p: 1 }} component={'p'} variant="body1">
						There is more... Coming soon!
					</Typography>
				</Box>
			</Box>
		</Container>
	);
};
