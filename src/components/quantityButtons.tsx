import React, { FC } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { ProductModel } from '../models/cardModel';

interface QuantityButtonsProps {
	card: ProductModel;
	quantity: number;
	incrementQuantity: () => void;
	decrementQuantity: (id: number) => void;
	addToCart: (selectedItem: ProductModel, quantity: number) => void;
}

export const QuantityButtons: FC<QuantityButtonsProps> = ({ card, quantity, incrementQuantity, decrementQuantity }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', mb: 2 }}>
			<Button
				variant={'outlined'}
				size={'small'}
				sx={{ minWidth: 32, fontSize: 24, lineHeight: 1 }}
				onClick={() => decrementQuantity(card.id)}>
				-
			</Button>
			<Typography sx={{ minWidth: '24px', textAlign: 'center' }}>{quantity}</Typography>
			<Button
				variant={'outlined'}
				size={'small'}
				sx={{ minWidth: 32, fontSize: 24, lineHeight: 1 }}
				onClick={incrementQuantity}>
				+
			</Button>
		</Box>
	);
};
