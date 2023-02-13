import React, { FC, useState } from 'react';
import { ProductModel } from '../models/productModel';
import { AmountButtons } from './amountButtons';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductProps {
	product: ProductModel;
	cart: ProductModel[];
	removeFromCart: (productId: number) => void;
	handleOpenModal: (currentProduct: ProductModel | null) => void;
	addToCart: (selectedProduct: ProductModel, amount: number) => void;
}

export const Product: FC<ProductProps> = ({ product, cart, addToCart, removeFromCart, handleOpenModal }) => {
	const [amount, setAmount] = useState(1);

	const { title, place, price, image } = product;

	const productInCart = cart.find(({ id }) => {
		return id === product.id;
	});

	const incrementAmount = () => {
		setAmount(amount + 1);
		if (productInCart) {
			addToCart({ ...product, amount }, amount);
		}
	};

	const decrementAmount = (id: number) => {
		if (productInCart) removeFromCart(id);
		if (amount > 1) setAmount(amount - 1);
		else {
			setAmount(1);
		}
	};

	return (
		<>
			<Card>
				<Box onClick={() => handleOpenModal(product)}>
					<CardMedia component="img" image={image[0].url} alt={image[0].fileName} />
					<CardContent sx={{ '&:last-child': { pb: 0 } }}>
						<Typography sx={{ mb: 4 }} variant="h5">
							{title}
						</Typography>
						<Typography gutterBottom variant="body2">
							<strong>Price:</strong> {price}
						</Typography>
						<Typography gutterBottom variant="body2">
							<strong>Place:</strong> {place}
						</Typography>
					</CardContent>
				</Box>
				<CardActions sx={{ p: 2, mt: 3, flexDirection: 'column' }}>
					{productInCart ? (
						<AmountButtons
							product={product}
							amount={amount}
							addToCart={addToCart}
							incrementAmount={incrementAmount}
							decrementAmount={decrementAmount}
						/>
					) : (
						<Button
							variant={'contained'}
							fullWidth
							onClick={() => addToCart({ ...product, amount }, amount)}>
							Buy
						</Button>
					)}
				</CardActions>
			</Card>
		</>
	);
};
