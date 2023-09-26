import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Grid } from '@mui/material';

import { useLocalStorage } from 'usehooks-ts';

import { CategoryCard } from 'pages/categories/category-card/category-card';

import { GeoLocationProps } from 'models/geolocation.model';

import { isUserAgentTelegram } from 'utils/deviceInfo';

import { getGeolocation } from 'api/geolocation';

import bonus from 'assets/bonus.webp';
import exchange from 'assets/exchange.webp';
import transfer from 'assets/transfer.webp';

import { categories } from './mock/categories';

export const Categories = () => {
	const { pathname } = useLocation();
	const [geolocation, setGeolocation] = useLocalStorage<GeoLocationProps | null>('geolocation', {
		country_code2: 'LK',
	});

	useEffect(() => {
		const abortController = new AbortController();

		const fetchGeolocation = async () => {
			try {
				if (geolocation === null) {
					const geo = await getGeolocation();
					setGeolocation(geo);
				} else return;
			} catch (error) {
				console.log(error);
			}
		};

		fetchGeolocation().catch(error => error);

		return () => {
			abortController.abort(); // Cancel the request if component unmounts
		};
	}, [geolocation, setGeolocation]);

	const isIndia = geolocation?.country_code2 === 'IN';
	const userCountry = geolocation?.country_code2;

	if (!geolocation) return null;

	return (
		<Container maxWidth={'md'} sx={{ pb: 1 }}>
			<Grid
				container
				columns={10}
				max-width={'sm'}
				justifyContent={'center'}
				spacing={4}
				sx={{ pt: pathname === '/' ? 3 : 0 }}>
				{!isIndia &&
					categories.map(({ title, image }) => {
						return <CategoryCard key={title} isLink title={title} image={image} />;
					})}
				<CategoryCard
					title={'Exchange'}
					isLink
					image={exchange}
					flowId={'ZGw6MTI3Mjgx'}
					userCountry={userCountry}
				/>
				<CategoryCard title={'Bonus'} image={bonus} flowId={'ZGw6MTI3Mjc4'} />
				{!isIndia && (
					<CategoryCard
						isLink={isUserAgentTelegram}
						title={'Transfer'}
						image={transfer}
						flowId={'ZGw6MTI1MDQ5'}
						userCountry={userCountry}
					/>
				)}
			</Grid>
		</Container>
	);
};
