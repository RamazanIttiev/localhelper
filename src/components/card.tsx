import React, { FC } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Pancakes from '../assets/pancakes.jpg';
interface ItemCardProps {
	title: string;
	price: string;
	description: string;
}

export const ItemCard: FC<ItemCardProps> = ({ title, price }) => {
	return (
		<Card>
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
	);
};
