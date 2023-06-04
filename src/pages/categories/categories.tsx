import React, { useEffect, useState } from 'react';
import { categories } from './mock/categories';
import { Container, Grid } from '@mui/material';
import { Category } from '../../components/category';
import { getGeolocation } from '../../api/geolocation';
import { useReactRouter } from '../../hooks/useReactRouter';
import { COUNTRY_CODE, GeoLocationProps } from '../../models/geolocation.model';

import bonus from '../../assets/bonus.webp';
import exchange from '../../assets/exchange.webp';
import transfer from '../../assets/transfer.webp';

interface CategoryModel {
	title: string;
	image: string;
}

export const Categories = () => {
	const { pathname } = useReactRouter();
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

	if (!geolocation) return null;

	return (
		<Container maxWidth={'md'} sx={{ pb: 1 }}>
			<Grid container justifyContent={'center'} spacing={4} sx={{ pt: pathname === '/' ? 3 : 0 }}>
				{!isIndia &&
					categories.map(({ title, image }: CategoryModel) => {
						return <Category key={title} isLink title={title} image={image} />;
					})}
				<Category title={'Exchange'} image={exchange} flowId={'ZGw6MTI3Mjgx'} />
				<Category title={'Bonus'} image={bonus} flowId={'ZGw6MTI3Mjc4'} />
				{!isIndia && <Category title={'Transfer'} image={transfer} flowId={'ZGw6MTI1MDQ5'} />}
			</Grid>
		</Container>
	);
};
