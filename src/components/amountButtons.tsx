import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';

interface AmountButtonsProps {
	product?: ProductModel;
	productInCart?: ProductModel;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const AmountButtons: FC<AmountButtonsProps> = ({ product, productInCart, addToCart, removeFromCart }) => {
	const theme = useTheme();
	console.log(productInCart);
	return (
		<Box
			sx={{
				p: 0,
				maxWidth: '7rem',
				borderRadius: '1rem',
				transition: 'all 0.4s',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: productInCart ? '7rem' : '5rem',
				background: productInCart ? theme.palette.primary.main : theme.palette.background.paper,
			}}>
			<IconButton
				sx={{ transition: 'all 0.4s' }}
				size={'small'}
				onClick={productInCart !== undefined ? () => removeFromCart(productInCart) : undefined}>
				<Icon sx={{ color: '#fff', fontSize: productInCart ? '1.125rem' : 0 }}>remove</Icon>
			</IconButton>
			<Typography
				fontSize={'0.7rem'}
				sx={{ fontWeight: 700, letterSpacing: ' 0.1rem', pl: productInCart ? 0 : '0.5rem' }}>
				{product?.price}
			</Typography>
			<IconButton size={'small'} onClick={product !== undefined ? () => addToCart(product) : undefined}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
