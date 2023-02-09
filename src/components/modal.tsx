import * as React from 'react';
import { Backdrop, Box, Modal, Button, Typography } from '@mui/material';
import { FC } from 'react';

interface CardModalProps {
	selectedCard: {
		title: string;
		price: string;
		description: string;
	} | null;
	isModalOpened: boolean;
	handleCloseModal: () => void;
}

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const CardModal: FC<CardModalProps> = ({ selectedCard, isModalOpened, handleCloseModal }) => {
	return (
		selectedCard && (
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={isModalOpened}
				onClose={handleCloseModal}
				closeAfterTransition>
				<Box sx={style}>
					<Typography id="transition-modal-title" variant="h6" component="h2">
						{selectedCard.title}
					</Typography>
					<Typography id="transition-modal-description" sx={{ mt: 2 }}>
						{selectedCard.price}
					</Typography>
					<Typography id="transition-modal-description" sx={{ mt: 2 }}>
						{selectedCard.description}
					</Typography>
					<Button>Buy</Button>
				</Box>
			</Modal>
		)
	);
};
