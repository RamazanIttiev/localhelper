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
				maxWidth: '7rem',
				borderRadius: '1rem',
				transition: 'all 0.4s',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: productFromCart ? '7rem' : '6rem',
				background: productFromCart ? theme.palette.primary.main : theme.palette.background.paper,
				...styles,
			}}>
			<IconButton
				sx={{ p: productFromCart ? 1 : 0, transition: 'all 0.4s' }}
				size={'medium'}
				onClick={productFromCart !== undefined ? () => removeFromCart(productFromCart) : undefined}>
				<Icon fontSize={'small'} sx={{ color: '#fff', opacity: productFromCart ? 1 : 0 }}>
					remove
				</Icon>
			</IconButton>
			<Typography fontSize={'0.7rem'} sx={{ fontWeight: 700, letterSpacing: ' 0.1rem' }}>
				{showAmount && productFromCart ? (
					<>
						{productFromCart?.amount} x {product?.price}
					</>
				) : (
					product?.price
				)}
			</Typography>
			<IconButton size={'medium'} onClick={product !== undefined ? () => addToCart(product) : undefined}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
