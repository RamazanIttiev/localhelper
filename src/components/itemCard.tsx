import React, { FC, useState } from 'react';
import { ProductModel } from '../models/cardModel';
import { QuantityButtons } from './quantityButtons';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductProps {
	card: ProductModel;
	cart: ProductModel[];
	removeFromCart: (itemId: number) => void;
	handleOpenModal: (currentCard: ProductModel | null) => void;
	addToCart: (selectedItem: ProductModel, quantity: number) => void;
}

export const Product: FC<ProductProps> = ({ card, cart, addToCart, removeFromCart, handleOpenModal }) => {
	const [quantity, setQuantity] = useState(1);

	const { title, place, price, image } = card;

	const itemInCart = cart.find(({ id }) => {
		return id === card.id;
	});

	const incrementQuantity = () => {
		setQuantity(quantity + 1);
		if (itemInCart) {
			addToCart({ ...card, quantity }, quantity);
		}
	};

	const decrementQuantity = (id: number) => {
		if (itemInCart) removeFromCart(id);
		if (quantity > 1) setQuantity(quantity - 1);
		else {
			setQuantity(1);
		}
	};

	return (
		<>
			<Card>
				<Box onClick={() => handleOpenModal(card)}>
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
					{itemInCart ? (
						<QuantityButtons
							card={card}
							quantity={quantity}
							addToCart={addToCart}
							incrementQuantity={incrementQuantity}
							decrementQuantity={decrementQuantity}
						/>
					) : (
						<Button
							variant={'contained'}
							fullWidth
							onClick={() => addToCart({ ...card, quantity }, quantity)}>
							Buy
						</Button>
					)}
				</CardActions>
			</Card>
		</>
	);
};
