import { useLocation } from 'react-router-dom';

import { Container, Box } from '@mui/material';

import { CategoryCard } from 'pages/categories/category-card/category-card.tsx';
import { categoriesPrimary, categoriesSecondary } from 'pages/categories/mock/categories.ts';

import { CountryCode } from 'common/models/geolocation.model.ts';

import feed from 'assets/feed.avif';

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
								userCountry={'LK'}
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
