import React, { CSSProperties } from 'react';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { useShoppingCart } from '../context/cart.context';
import { RestaurantProductModel } from '../pages/restaurant/restaurant-product/restaurant-product.model';

interface Props {
	showPrice?: boolean;
	showAmount?: boolean;
	styles?: CSSProperties;
	restaurantTitle: string;
	product: RestaurantProductModel;
}

export const AmountButtons = ({ styles, product, showAmount = false, showPrice = true, restaurantTitle }: Props) => {
	const theme = useTheme();
	const { incrementCartAmount, decrementCartAmount, getItemAmount } = useShoppingCart();

	const productAmount = getItemAmount(product.id);
	const isRemoveVisible = productAmount > 0;

	return (
		<Box
			sx={{
				p: 0,
				maxWidth: '9rem',
				borderRadius: '1rem',
				transition: 'all 0.2s',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: isRemoveVisible ? '9rem' : '8rem',
				background: theme.palette.background.paper,
				...styles,
			}}>
			<IconButton
				sx={{ p: isRemoveVisible ? 1 : 0, transition: 'all 0.2s' }}
				size={'medium'}
				onClick={() => decrementCartAmount(product.id)}>
				<Icon fontSize={'small'} sx={{ color: '#fff', opacity: isRemoveVisible ? 1 : 0 }}>
					remove
				</Icon>
			</IconButton>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				{showAmount && <Typography variant={'caption'}>{productAmount}</Typography>}
				{showPrice && (
					<Typography fontSize={'0.8rem'} sx={{ fontWeight: 600, letterSpacing: '0.1rem' }}>
						&nbsp;{product?.price} Rs
					</Typography>
				)}
			</Box>
			<IconButton size={'medium'} onClick={() => incrementCartAmount(product.id, restaurantTitle)}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
