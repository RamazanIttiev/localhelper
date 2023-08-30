import React, { useEffect, useState } from 'react';
import { categories } from './mock/categories';
import { Container, Grid } from '@mui/material';
import { Category } from '../../components/category';
import { getGeolocation } from '../../api/geolocation';
import { COUNTRY_CODE, GeoLocationProps } from '../../models/geolocation.model';

import bonus from '../../assets/bonus.webp';
import exchange from '../../assets/exchange.webp';
import transfer from '../../assets/transfer.webp';
import { useLocation } from 'react-router-dom';

interface CategoryModel {
	title: string;
	image: string;
}

export const Categories = () => {
	const { pathname } = useLocation();
	const [geolocation, setGeolocation] = useState<GeoLocationProps | undefined>();

	useEffect(() => {
		const fetchGeolocation = async () => {
			try {
				const geo = await getGeolocation();
				setGeolocation(geo);
			} catch (error) {
				console.log(error);
			}
		};

		fetchGeolocation().catch(error => error);
	}, []);

	const isIndia = geolocation?.country_code2 === COUNTRY_CODE.India;
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
					categories.map(({ title, image }: CategoryModel) => {
						return <Category key={title} isLink title={title} image={image} />;
					})}
				<Category title={'Exchange'} image={exchange} flowId={'ZGw6MTI3Mjgx'} userCountry={userCountry} />
				<Category title={'Bonus'} image={bonus} flowId={'ZGw6MTI3Mjc4'} />
				{!isIndia && (
					<Category title={'Transfer'} image={transfer} flowId={'ZGw6MTI1MDQ5'} userCountry={userCountry} />
				)}
			</Grid>
		</Container>
	);
};
