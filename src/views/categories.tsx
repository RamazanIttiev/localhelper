import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Category } from '../components/category';
import { categories } from '../mock/categories';
import { CategoryModel } from '../models/categories';

import bonus from '../assets/bonus.jpg';
import exchange from '../assets/exchange.jpg';
import transfer from '../assets/transfer.jpg';

interface CategoriesProps {}

export const Categories: FC<CategoriesProps> = () => {
	return (
		<Grid container justifyContent={'center'} spacing={4} sx={{ pt: 3 }}>
			{categories.map(({ title, image }: CategoryModel) => {
				return <Category key={title} isLink title={title} image={image} />;
			})}
			<Category title={'Bonus'} image={bonus} idForBot={'ZGw6MTI3Mjc4'} />
			<Category title={'Exchange'} image={exchange} idForBot={'ZGw6MTI3Mjgx'} />
			<Category title={'Transfer'} image={transfer} idForBot={'ZGw6MTI1MDQ5'} />
			<Outlet />
		</Grid>
	);
};