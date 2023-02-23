import React, { FC } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ProductModel } from '../models/productModel';

interface AmountButtonsProps {
	amount: number;
	product: ProductModel;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const AmountButtons: FC<AmountButtonsProps> = ({ product, addToCart, removeFromCart, amount }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
			<Button
				variant={'outlined'}
				size={'small'}
				sx={{ minWidth: 32, fontSize: 24, lineHeight: 1 }}
				onClick={() => removeFromCart(product)}>
				-
			</Button>
			<Typography sx={{ minWidth: '24px', textAlign: 'center' }}>{amount}</Typography>
			<Button
				variant={'outlined'}
				size={'small'}
				sx={{ minWidth: 32, fontSize: 24, lineHeight: 1 }}
				onClick={() => addToCart(product)}>
				+
			</Button>
		</Box>
	);
};
