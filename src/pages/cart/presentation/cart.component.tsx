import React from 'react';

import { Box, Container } from '@mui/material';

import { CartHeader } from 'pages/cart/presentation/components/cart-header';
import { CartList } from 'pages/cart/presentation/components/cart-list';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

import { theme } from 'theme/theme';

interface Props {
	restaurantTitle?: string;
	cartList: RestaurantItem[];
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
