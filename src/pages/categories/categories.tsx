import React from 'react';
import { categories } from './mock/categories';
import { Container, Grid } from '@mui/material';
import { Category } from '../../components/category';
import { useReactRouter } from '../../hooks/useReactRouter';

import bonus from '../../assets/bonus.webp';
import exchange from '../../assets/exchange.webp';
import transfer from '../../assets/transfer.webp';

interface CategoryModel {
	title: string;
	image: string;
}

export const Categories = () => {
	const { pathname } = useReactRouter();

	return (
		<Container maxWidth={'md'} sx={{ pb: 1 }}>
			<Grid container justifyContent={'center'} spacing={4} sx={{ pt: pathname === '/' ? 3 : 0 }}>
				{categories.map(({ title, image }: CategoryModel) => {
					return <Category key={title} isLink title={title} image={image} />;
				})}
				<Category title={'Exchange'} image={exchange} isLink flowId={'ZGw6MTI3Mjgx'} />
				<Category title={'Bonus'} image={bonus} flowId={'ZGw6MTI3Mjc4'} />
				<Category title={'Transfer'} image={transfer} flowId={'ZGw6MTI1MDQ5'} />
			</Grid>
		</Container>
	);
};
