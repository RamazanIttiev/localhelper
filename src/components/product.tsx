import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { AmountButtons } from './amountButtons';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductProps {
	product: ProductModel;
	cart: ProductModel[];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
	handleOpenModal: (currentProduct: ProductModel | null) => void;
}

export const Product: FC<ProductProps> = ({ product, cart, addToCart, removeFromCart, handleOpenModal }) => {
	const { title, place, price, image } = product;

	const productInCart = cart.find(({ id }) => {
		return id === product.id;
	});

	return (
		<Card>
			<Box onClick={() => handleOpenModal(product)}>
				<CardMedia component="img" image={image[0].url} alt={image[0].alt} />
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
						amount={productInCart.amount}
						addToCart={addToCart}
						removeFromCart={removeFromCart}
					/>
				) : (
					<Button variant={'contained'} fullWidth onClick={() => addToCart(product)}>
						Buy
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
