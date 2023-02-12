import React, { FC } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { CardModel } from '../models/cardModel';

interface ItemCardProps {
	card: CardModel;
	handleOpenModal: (currentCard: CardModel | null) => void;
}

export const ItemCard: FC<ItemCardProps> = ({ card, handleOpenModal }) => {
	const { title, place, price, image } = card;
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
				<CardActions sx={{ p: 2 }}>
					<Button variant={'contained'} fullWidth>
						Buy
					</Button>
				</CardActions>
			</Card>
		</>
	);
};
