import React, { CSSProperties, FC } from 'react';
import { FoodModel, ProductModel } from '../models/productModel';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';

interface AmountButtonsProps {
	showText?: boolean;
	product?: FoodModel;
	styles?: CSSProperties;
	amountText?: string | number;
	productFromCart?: FoodModel;
	addToCart: (product: FoodModel) => void;
	removeFromCart: (product: FoodModel) => void;
}

export const AmountButtons: FC<AmountButtonsProps> = ({
	styles,
	product,
	addToCart,
	removeFromCart,
	productFromCart,
	amountText,
	showText = true,
}) => {
	const theme = useTheme();

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
				sx={{ p: productFromCart ? 1 : 0, transition: 'all 0.2s' }}
				size={'medium'}
				onClick={productFromCart !== undefined ? () => removeFromCart(productFromCart) : undefined}>
				<Icon fontSize={'small'} sx={{ color: '#fff', opacity: productFromCart ? 1 : 0 }}>
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
			<IconButton size={'medium'} onClick={product !== undefined ? () => addToCart(product) : undefined}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
