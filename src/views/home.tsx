import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Category } from '../components/category';
import { categories } from '../mock/categories';
import { CategoryModel } from '../models/categories';

import bonus from '../assets/bonus.gif';
import exchange from '../assets/exchange.gif';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
	return (
		<Grid container justifyContent={'center'} spacing={4} sx={{ pt: 3 }}>
			{categories.map(({ title, image }: CategoryModel) => {
				return <Category key={title} isLink title={title} image={image} />;
			})}
			<Category title={'Bonus'} image={bonus} />
			<Category title={'Exchange'} image={exchange} />
		</Grid>
	);
};
