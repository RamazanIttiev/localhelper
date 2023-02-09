import React, { FC, useState } from 'react';
import { Container, Grid, Pagination, Typography } from '@mui/material';
import { data } from '../mock';
import { usePagination } from '../utils/pagination';
import { ItemCard } from '../components/card';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const [page, setPage] = useState(1);
	const cardsPerPage = 10;

	const count = Math.ceil(data.length / cardsPerPage);
	const cardsData = usePagination(data, cardsPerPage);

	const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
		setPage(page);
		cardsData.jump(page);
	};

	return (
		<Container sx={{ pt: 8, pb: 9 }}>
			<Typography>Food</Typography>
			<Grid container spacing={2} sx={{ pt: 2 }}>
				{cardsData
					.currentData()
					.map(({ title, price, description }: { title: string; price: string; description: string }) => {
						return (
							<Grid item xs={6}>
								<ItemCard title={title} price={price} description={description} />
							</Grid>
						);
					})}
			</Grid>
			<Pagination
				sx={{
					right: '50%',
					width: '100%',
					bottom: '16px',
					display: 'flex',
					minWidth: '100%',
					position: 'fixed',
					paddingTop: '16px',
					background: '#fff',
					justifyContent: 'center',
					transform: 'translateX(50%)',
				}}
				count={count}
				page={page}
				onChange={handleChange}
			/>
		</Container>
	);
};
