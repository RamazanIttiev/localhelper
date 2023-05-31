import React, { CSSProperties, FC } from 'react';
import { FoodModel } from '../models/productModel';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactRouter } from '../hooks/useReactRouter';
import { useShoppingCart } from '../context/cart.context';
import { CartItem } from '../models/cart.model';

interface AmountButtonsProps {
	product: FoodModel;
	showText?: boolean;
	styles?: CSSProperties;
	productFromCart?: CartItem;
	amountText?: string | number;
	handleProductAmount?: (action: CART_ACTION) => void;
}

export type CART_ACTION = 'add' | 'remove';

export const AmountButtons: FC<AmountButtonsProps> = ({
	styles,
	product,
	productFromCart,
	amountText,
	showText = true,
	handleProductAmount,
}) => {
	const theme = useTheme();
	const { isRestaurantDetailsRoute } = useReactRouter();

	const { incrementCartAmount, decrementCartAmount } = useShoppingCart();

	const isRemoveVisible = () => {
		if (productFromCart && !product.dishSize) {
			return true;
		}
		if (isRestaurantDetailsRoute && product.amount === 1) return false;
		if (productFromCart) return true;
		return !!(product.amount > 1 && product.dishSize);
	};

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
				width: productFromCart ? '9rem' : '8rem',
				background: theme.palette.background.paper,
				...styles,
			}}>
			<IconButton
				sx={{ p: isRemoveVisible() ? 1 : 0, transition: 'all 0.2s' }}
				size={'medium'}
				onClick={() => decrementCartAmount(product.id)}>
				<Icon fontSize={'small'} sx={{ color: '#fff', opacity: isRemoveVisible() ? 1 : 0 }}>
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
			<IconButton size={'medium'} onClick={() => incrementCartAmount(product.id, product.restaurant)}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
