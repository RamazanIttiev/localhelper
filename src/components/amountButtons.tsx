import React, { CSSProperties, FC } from 'react';
import { ProductModel } from '../models/productModel';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';

interface AmountButtonsProps {
	showAmount?: boolean;
	styles?: CSSProperties;
	product?: ProductModel;
	productFromCart?: ProductModel;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const AmountButtons: FC<AmountButtonsProps> = ({
	styles,
	product,
	showAmount = true,
	addToCart,
	removeFromCart,
	productFromCart,
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
			{showAmount && productFromCart ? (
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography variant={'caption'}>{productFromCart?.amount} x&nbsp;</Typography>
					<Typography fontSize={'0.8rem'} sx={{ fontWeight: 600, letterSpacing: '0.1rem' }}>
						{product?.price} Rs
					</Typography>
				</Box>
			) : (
				<Typography fontSize={'0.8rem'} sx={{ fontWeight: 600, letterSpacing: '0.1rem' }}>
					{product?.price} Rs
				</Typography>
			)}
			<IconButton size={'medium'} onClick={product !== undefined ? () => addToCart(product) : undefined}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
