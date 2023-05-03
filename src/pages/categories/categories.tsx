import React from 'react';
import { Container, Grid } from '@mui/material';
import { categories } from './mock/categories';
import { CategoryModel } from './models/categories';
import { Category } from '../../components/category';
import { useReactRouter } from '../../hooks/useReactRouter';

import bonus from '../../assets/bonus.jpg';
import exchange from '../../assets/exchange.jpg';
import transfer from '../../assets/transfer.jpg';

export const Categories = () => {
	const { pathname } = useReactRouter();

	return (
		<Container maxWidth={'md'} sx={{ pb: 1 }}>
			<Grid container justifyContent={'center'} spacing={4} sx={{ pt: pathname === '/' ? 3 : 0 }}>
				{categories.map(({ title, image }: CategoryModel) => {
					return <Category key={title} isLink title={title} image={image} />;
				})}
				<Category title={'Exchange'} image={exchange} flowId={'ZGw6MTI3Mjgx'} />
				<Category title={'Bonus'} image={bonus} flowId={'ZGw6MTI3Mjc4'} />
				<Category title={'Transfer'} image={transfer} flowId={'ZGw6MTI1MDQ5'} />
			</Grid>
		</Container>
	);
};
