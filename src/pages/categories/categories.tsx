import React, { useEffect, useState } from 'react';
import { isGeo } from '../../utils/typeGuard';
import { categories } from './mock/categories';
import { Container, Grid } from '@mui/material';
import { Category } from '../../components/category';
import { getGeolocation } from '../../api/geolocation';
import { useReactRouter } from '../../hooks/useReactRouter';
import { COUNTRY_CODE, GeoProps } from '../../models/geolocation.model';

import bonus from '../../assets/bonus.webp';
import exchange from '../../assets/exchange.webp';
import transfer from '../../assets/transfer.webp';

interface CategoryModel {
	title: string;
	image: string;
}

export const Categories = () => {
	const { pathname } = useReactRouter();
	const [geolocation, setGeolocation] = useState<GeoProps | string | undefined>();

	useEffect(() => {
		const fetchGeolocation = async () => {
			try {
				const geo = await getGeolocation();
				if (typeof geo !== 'string') {
					const { country, city, country_code } = geo.results[0].components;
					const geometry = geo.results[0].geometry;
					setGeolocation({ country, city, country_code, geometry });
				} else {
					setGeolocation(geo);
				}
			} catch (error: any) {
				setGeolocation(error);
			}
		};

		fetchGeolocation().catch(error => error);
	}, []);

	const isIndia = isGeo(geolocation) && geolocation?.country_code === COUNTRY_CODE.India;

	return (
		<Container maxWidth={'md'} sx={{ pb: 1 }}>
			<Grid container justifyContent={'center'} spacing={4} sx={{ pt: pathname === '/' ? 3 : 0 }}>
				{!isIndia &&
					categories.map(({ title, image }: CategoryModel) => {
						return <Category key={title} isLink title={title} image={image} />;
					})}
				<Category geolocation={geolocation} title={'Exchange'} image={exchange} flowId={'ZGw6MTI3Mjgx'} />
				<Category geolocation={geolocation} title={'Bonus'} image={bonus} flowId={'ZGw6MTI3Mjc4'} />
				{!isIndia && (
					<Category geolocation={geolocation} title={'Transfer'} image={transfer} flowId={'ZGw6MTI1MDQ5'} />
				)}
			</Grid>
		</Container>
	);
};
