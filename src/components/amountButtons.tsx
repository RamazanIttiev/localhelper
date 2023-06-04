import React, { CSSProperties, FC } from 'react';
import { FoodModel } from '../models/product.model';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { useReactRouter } from '../hooks/useReactRouter';
import { useShoppingCart } from '../context/cart.context';
import { useNavigate } from 'react-router-dom';

interface AmountButtonsProps {
	product: FoodModel;
	showText?: boolean;
	styles?: CSSProperties;
	amountText?: string | number;
	handleProductAmount?: (action: CART_ACTION) => void;
}

export type CART_ACTION = 'add' | 'remove';

export const AmountButtons: FC<AmountButtonsProps> = ({
	styles,
	product,
	amountText,
	showText = true,
	handleProductAmount,
}) => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { getItemAmount } = useShoppingCart();
	const { isRestaurantRoute, isRestaurantDetailsRoute } = useReactRouter();
	const { incrementCartAmount, decrementCartAmount } = useShoppingCart();

	const productAmount = getItemAmount(product.id);

	const isRemoveVisible = () => {
		if (productAmount > 0 && !product.dishSize) {
			return true;
		}
		if (isRestaurantDetailsRoute && product.amount === 1) return false;
		if (productAmount > 0) return true;
		return !!(product.amount > 1 && product.dishSize);
	};
	const handleProductIncrement = () => {
		if (product.dishSize && isRestaurantRoute) {
			return navigate(product.title.toLowerCase(), { state: { ...product } });
		}
		if (product.dishSize && isRestaurantDetailsRoute && handleProductAmount) {
			return handleProductAmount('add');
		} else {
			return incrementCartAmount(product.id, product.restaurant, product.extraOptions);
		}
	};

	const handleProductDecrement = () => {
		if (product.dishSize && isRestaurantDetailsRoute && handleProductAmount) {
			return handleProductAmount('remove');
		} else {
			return decrementCartAmount(product.id);
		}
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
				width: productAmount > 0 ? '9rem' : '8rem',
				background: theme.palette.background.paper,
				...styles,
			}}>
			<IconButton
				sx={{ p: isRemoveVisible() ? 1 : 0, transition: 'all 0.2s' }}
				size={'medium'}
				onClick={handleProductDecrement}>
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
			<IconButton size={'medium'} onClick={handleProductIncrement}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
