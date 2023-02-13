import React, { FC, useState, useEffect } from 'react';
import { Container, Grid, Pagination, Typography, Divider } from '@mui/material';
import { usePagination } from '../utils/pagination';
import { Product } from '../components/itemCard';
import { CardModal } from '../components/modal';
import { ProductModel } from '../models/cardModel';
import { airtableBase } from '../app/App';
import { mapFoodData } from '../services/mappers';
import { useCategory } from '../hooks/useCategory';

interface LayoutProps {
	cart: ProductModel[];
	removeFromCart: (itemId: number) => void;
	addToCart: (selectedItem: ProductModel, quantity: number) => void;
}

export const Layout: FC<LayoutProps> = ({ cart, addToCart, removeFromCart }) => {
	const [page, setPage] = useState(1);
	const [isModalOpened, setOpenModal] = React.useState(false);
	const [cardsData, setCardsData] = useState<ProductModel[]>([]);
	const [selectedCard, setSelectedCard] = useState<ProductModel | null>(null);

	const currentCategory = useCategory();

	useEffect(() => {
		airtableBase(currentCategory)
			.select({
				view: currentCategory,
			})
			.eachPage(records => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return setCardsData(mapFoodData(records));
			});
	}, [currentCategory]);

	const cardsPerPage = 10;

	const cardsSliced = usePagination(cardsData, cardsPerPage);
	const count = Math.ceil(cardsData.length / cardsPerPage);

	const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
		cardsSliced.jump(page);
	};

	const handleOpenModal = (currentCard: ProductModel | null) => {
		setSelectedCard(currentCard);
		setOpenModal(true);
	};
	const handleCloseModal = () => setOpenModal(false);

	return (
		<Container sx={{ pt: 9, pb: 9 }}>
			<Typography variant={'h5'} textAlign={'left'}>
				{currentCategory}
			</Typography>
			<Divider />
			<Grid container spacing={2} sx={{ pt: 3 }}>
				{cardsSliced.currentData().map((card: ProductModel) => {
					return (
						<Grid item xs={6} key={card.id}>
							<Product
								card={card}
								cart={cart}
								addToCart={addToCart}
								removeFromCart={removeFromCart}
								handleOpenModal={handleOpenModal}
							/>
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
					onChange={handlePageChange}
				/>
			)}
		</Container>
	);
};
