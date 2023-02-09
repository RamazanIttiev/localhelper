import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Pancakes from '../assets/pancakes.jpg';
import { CardModel } from '../models/cardModel';

interface ItemCardProps {
	title: string;
	price: string;
	description: string;
	handleOpenModal: (currentCard: CardModel | null) => void;
}

export const ItemCard: FC<ItemCardProps> = ({ title, price, description, handleOpenModal }) => {
	return (
		<>
			<Card
				onClick={() =>
					handleOpenModal({
						title,
						price,
						description,
					})
				}>
				<CardMedia component="img" height="194" image={Pancakes} alt="Pancakes" />
				<CardContent>
					<Typography gutterBottom variant="h5">
						{title}
					</Typography>
					<Typography gutterBottom variant="body2">
						{price}
					</Typography>
				</CardContent>
				<CardActions>
					<Button fullWidth>Buy</Button>
				</CardActions>
			</Card>
		</>
	);
};
