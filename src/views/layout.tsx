import React, { FC, useState, useEffect, useCallback } from 'react';
import { Container, Grid, Pagination, Typography, Divider } from '@mui/material';
import { usePagination } from '../utils/pagination';
import { ItemCard } from '../components/itemCard';
import { CardModal } from '../components/modal';
import { CardModel } from '../models/cardModel';
import { airtableBase } from '../app/App';
import { mapFoodData } from '../services/mappers';
import { useLocation } from 'react-router-dom';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const [page, setPage] = useState(1);
	const [cardsData, setCardsData] = useState<CardModel[]>([]);
	const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
	const [isModalOpened, setOpenModal] = React.useState(false);

	const { pathname } = useLocation();

	const getCategory = useCallback(() => {
		switch (pathname) {
			case '/categories/food': {
				return 'Food';
			}
			case '/categories/weed': {
				return 'Weed';
			}
			default: {
				return 'Food';
			}
		}
	}, [pathname]);

	useEffect(() => {
		airtableBase(getCategory())
			.select({
				view: getCategory(),
			})
			.eachPage(records => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return setCardsData(mapFoodData(records));
			});
	}, [getCategory, cardsData.length]);

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
		<Container sx={{ pt: 9, pb: 9 }}>
			<Typography variant={'h5'} textAlign={'left'}>
				{getCategory()}
			</Typography>
			<Divider />
			<Grid container spacing={2} sx={{ pt: 3 }}>
				{cardsSliced.currentData().map((card: CardModel) => {
					return (
						<Grid item xs={6} key={card.id}>
							<ItemCard card={card} handleOpenModal={handleOpenModal} />
						</Grid>
					);
				})}
			</Grid>
			<CardModal selectedCard={selectedCard} isModalOpened={isModalOpened} handleCloseModal={handleCloseModal} />
			{cardsData.length >= cardsPerPage && (
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
