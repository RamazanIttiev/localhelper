import * as React from 'react';
import { Box, Modal, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { CardModel } from '../models/cardModel';

interface CardModalProps {
	selectedCard: CardModel | null;
	isModalOpened: boolean;
	handleCloseModal: () => void;
}

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 364,
	backgroundColor: 'background.paper',
	boxShadow: 24,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderRadius: 2,
	outline: 'none',
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
					<Box
						component={'img'}
						src={selectedCard.image[0].url}
						alt={selectedCard.image[0].fileName}
						width={'100%'}
						sx={{ borderRadius: 2, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
					/>
					<Box sx={{ width: '100%', p: 2 }}>
						<Typography id="transition-modal-title" variant="h6" component="h2" textAlign={'center'}>
							{selectedCard.title}
						</Typography>
						<Typography sx={{ mt: 2 }}>
							<strong>Price:</strong> {selectedCard.price}
						</Typography>
						<Typography sx={{ mt: 2, mb: 3 }}>
							<strong>Description:</strong> {selectedCard.description}
						</Typography>
						<Button variant={'contained'} fullWidth>
							Buy
						</Button>
					</Box>
				</Box>
			</Modal>
		)
	);
};
