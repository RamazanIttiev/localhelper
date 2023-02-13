import React, { FC } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ProductModel } from '../models/productModel';

interface AmountButtonsProps {
	product: ProductModel;
	amount: number;
	incrementAmount: () => void;
	decrementAmount: (id: number) => void;
	addToCart: (selectedProduct: ProductModel, amount: number) => void;
}

export const AmountButtons: FC<AmountButtonsProps> = ({ product, amount, incrementAmount, decrementAmount }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', mb: 2 }}>
			<Button
				variant={'outlined'}
				size={'small'}
				sx={{ minWidth: 32, fontSize: 24, lineHeight: 1 }}
				onClick={() => decrementAmount(product.id)}>
				-
			</Button>
			<Typography sx={{ minWidth: '24px', textAlign: 'center' }}>{amount}</Typography>
			<Button
				variant={'outlined'}
				size={'small'}
				sx={{ minWidth: 32, fontSize: 24, lineHeight: 1 }}
				onClick={incrementAmount}>
				+
			</Button>
		</Box>
	);
};
