import React, { FC, useState } from 'react';
import { Container, Grid, Pagination, Typography } from '@mui/material';
import { cardsTotal } from '../mock';
import { usePagination } from '../utils/pagination';
import { ItemCard } from '../components/card';
import { CardModal } from '../components/modal';
import { CardModel } from '../models/cardModel';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const [page, setPage] = useState(1);
	const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
	const [isModalOpened, setOpenModal] = React.useState(false);

	const cardsPerPage = 10;

	const count = Math.ceil(cardsTotal.length / cardsPerPage);
	const cardsSliced = usePagination(cardsTotal, cardsPerPage);

	const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
		cardsSliced.jump(page);
	};

	const handleOpenModal = (currentCard: CardModel | null) => {
		setSelectedCard(currentCard);
		setOpenModal(true);
	};
	const handleCloseModal = () => setOpenModal(false);

	return (
		<Container sx={{ pt: 11, pb: 9 }}>
			<Typography variant={'h4'} gutterBottom>
				Mains
			</Typography>
			<Grid container spacing={2} sx={{ pt: 2 }}>
				{cardsSliced
					.currentData()
					.map(({ title, price, description }: { title: string; price: string; description: string }) => {
						return (
							<Grid item xs={6} key={title}>
								<ItemCard
									title={title}
									price={price}
									description={description}
									handleOpenModal={handleOpenModal}
								/>
							</Grid>
						);
					})}
			</Grid>
			<CardModal selectedCard={selectedCard} isModalOpened={isModalOpened} handleCloseModal={handleCloseModal} />
			{cardsTotal.length >= cardsPerPage && (
				<Pagination
					sx={{
						right: '50%',
						width: '100%',
						bottom: '0',
						display: 'flex',
						minWidth: '100%',
						position: 'fixed',
						paddingTop: '8px',
						background: '#fff',
						paddingBottom: '8px',
						justifyContent: 'center',
						transform: 'translateX(50%)',
					}}
					count={count}
					page={page}
					onChange={handleChange}
				/>
			)}
		</Container>
	);
};
