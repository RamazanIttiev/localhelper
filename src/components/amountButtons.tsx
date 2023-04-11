import React, { CSSProperties, FC } from 'react';
import { ProductModel } from '../pages/productDetails/models/productModel';
import { Box, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { useReactRouter } from '../hooks/useReactRouter';

interface AmountButtonsProps {
	styles?: CSSProperties;
	product?: ProductModel;
	productFromCart?: ProductModel;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const AmountButtons: FC<AmountButtonsProps> = ({
	styles,
	product,
	addToCart,
	removeFromCart,
	productFromCart,
}) => {
	const theme = useTheme();
	const { isProductDetailsRoute } = useReactRouter();

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
				width: productFromCart ? '7rem' : '5rem',
				background: productFromCart ? theme.palette.primary.main : theme.palette.background.paper,
				...styles,
			}}>
			<IconButton
				sx={{ transition: 'all 0.4s' }}
				size={'small'}
				onClick={productFromCart !== undefined ? () => removeFromCart(productFromCart) : undefined}>
				<Icon sx={{ color: '#fff', fontSize: productFromCart ? '1.125rem' : 0 }}>remove</Icon>
			</IconButton>
			<Typography
				fontSize={'0.7rem'}
				sx={{ fontWeight: 700, letterSpacing: ' 0.1rem', pl: productFromCart ? 0 : '0.5rem' }}>
				{isProductDetailsRoute ? (
					<>
						{productFromCart?.amount}
						{productFromCart && 'x'} {product?.price}
					</>
				) : (
					product?.price
				)}
			</Typography>
			<IconButton size={'small'} onClick={product !== undefined ? () => addToCart(product) : undefined}>
				<Icon fontSize={'small'} sx={{ color: '#fff' }}>
					add
				</Icon>
			</IconButton>
		</Box>
	);
};
