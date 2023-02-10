import React, { FC, useState, useEffect } from 'react';
import { Container, Grid, Pagination, Typography } from '@mui/material';
import { cardsTotal } from '../mock';
import { usePagination } from '../utils/pagination';
import { ItemCard } from '../components/itemCard';
import { CardModal } from '../components/modal';
import { CardModel } from '../models/cardModel';
import { airtableBase } from '../app/App';
import { mapFoodData } from '../services/mappers';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const [page, setPage] = useState(1);
	const [cardsData, setCardsData] = useState<CardModel[]>([]);
	const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
	const [isModalOpened, setOpenModal] = React.useState(false);

	useEffect(() => {
		airtableBase('Food')
			.select({
				view: 'Food View',
			})
			.eachPage(records => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return setCardsData(mapFoodData(records));
			});
	}, [cardsData.length]);

	const cardsPerPage = 10;

	const count = Math.ceil(cardsData.length / cardsPerPage);
	const cardsSliced = usePagination(cardsData, cardsPerPage);

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
				{cardsSliced.currentData().map((card: CardModel) => {
					return (
						<Grid item xs={6} key={card.id}>
							<ItemCard card={card} handleOpenModal={handleOpenModal} />
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
