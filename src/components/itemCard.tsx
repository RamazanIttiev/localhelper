import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { CardModel } from '../models/cardModel';

interface ItemCardProps {
	card: CardModel;
	handleOpenModal: (currentCard: CardModel | null) => void;
}

export const ItemCard: FC<ItemCardProps> = ({ card, handleOpenModal }) => {
	const { title, place, price, image } = card;
	return (
		<>
			<Card onClick={() => handleOpenModal(card)}>
				<CardMedia component="img" height="194" image={image[0].url} alt="Pancakes" />
				<CardContent>
					<Typography gutterBottom variant="h5">
						{title}
					</Typography>
					<Typography gutterBottom variant="body2">
						{price}
					</Typography>
					<Typography gutterBottom variant="body2">
						{place}
					</Typography>
				</CardContent>
				<CardActions>
					<Button variant={'contained'} fullWidth>
						Buy
					</Button>
				</CardActions>
			</Card>
		</>
	);
};
