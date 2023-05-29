import React, { CSSProperties, FC } from 'react';
import { useCart } from '../hooks/useCart';
import { FoodModel } from '../models/productModel';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactRouter } from '../hooks/useReactRouter';

interface AmountButtonsProps {
	product: FoodModel;
	showText?: boolean;
	styles?: CSSProperties;
	productFromCart?: FoodModel;
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
	const navigate = useNavigate();
	const { addToCart, removeFromCart } = useCart();
	const { isRestaurantRoute, isRestaurantDetailsRoute } = useReactRouter();

	const handleAddToCart = () => {
		if (product?.DishSize && isRestaurantRoute) {
			return navigate(product.title.toLowerCase(), { state: { ...product } });
		}
		if (product?.DishSize && isRestaurantDetailsRoute && handleProductAmount) {
			return handleProductAmount('add');
		} else {
			return addToCart(product);
		}
	};

	const handleRemoveFromCart = () => {
		if (product?.DishSize && isRestaurantDetailsRoute && handleProductAmount) {
			return handleProductAmount('remove');
		} else {
			return removeFromCart(product);
		}
	};

	const isRemoveVisible = () => {
		if (productFromCart && !product.DishSize) {
			return true;
		}
		if (isRestaurantDetailsRoute && product.amount === 1) return false;
		if (productFromCart) return true;
		return !!(product.amount > 1 && product.DishSize);
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
				onClick={handleRemoveFromCart}>
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
			<IconButton size={'medium'} onClick={handleAddToCart}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
