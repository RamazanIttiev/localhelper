import React, { CSSProperties, FC } from 'react';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { useShoppingCart } from '../context/cart.context';
import { RestaurantProductModel } from '../pages/restaurant/components/restaurant-product/restaurant-product.model';

interface AmountButtonsProps {
	product: RestaurantProductModel;
	showText?: boolean;
	styles?: CSSProperties;
	amountText?: string | number;
	restaurantTitle: string;
}

export type CART_ACTION = 'add' | 'remove';

export const AmountButtons: FC<AmountButtonsProps> = ({
	styles,
	product,
	amountText,
	showText = true,
	restaurantTitle,
}) => {
	const theme = useTheme();
	const { incrementCartAmount, decrementCartAmount, getItemAmount } = useShoppingCart();

	const isRemoveVisible = getItemAmount(product.id) > 0;

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
				{amountText !== undefined ? <Typography variant={'caption'}>{amountText}</Typography> : null}
				{showText && (
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
