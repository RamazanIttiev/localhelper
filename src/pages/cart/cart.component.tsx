import React from 'react';
import { theme } from '../../theme';
import { Box, Container } from '@mui/material';
import { CartList } from './components/cart-list';
import { CartHeader } from './components/cart-header';
import { RestaurantProductModel } from '../restaurant/restaurant-product/restaurant-product.model';

interface Props {
	restaurantTitle: string;
	cartList: RestaurantProductModel[];
}

export const Cart = ({ cartList, restaurantTitle }: Props) => {
	return (
		<Container maxWidth={'sm'} sx={{ pb: 5 }}>
			<CartHeader restaurantTitle={restaurantTitle} />
			<CartList cartList={cartList} restaurantTitle={restaurantTitle} />
			<Box
				sx={{
					left: 0,
					bottom: 0,
					width: '100%',
					position: 'fixed',
					padding: 2,
					backgroundColor: theme.palette.background.default,
				}}
			/>
		</Container>
	);
};
