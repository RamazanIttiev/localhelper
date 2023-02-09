import React, { FC, useState } from 'react';
import { Button, Card, CardActions, CardContent, Container, Grid, Pagination, Typography } from '@mui/material';
import { data } from '../mock';
import { usePagination } from '../utils/pagination';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const [page, setPage] = useState(1);
	const cardsPerPage = 10;

	const count = Math.ceil(data.length / cardsPerPage);
	const cardsData = usePagination(data, cardsPerPage);

	const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
		console.log(page);
		setPage(page);
		cardsData.jump(page);
	};

	return (
		<Container sx={{ pt: 8, pb: 9 }}>
			<Typography>Food</Typography>
			<Grid container spacing={2} sx={{ pt: 2 }}>
				{cardsData.currentData().map(({ title, id }: { title: string; id: number }) => {
					return (
						<Grid item xs={6}>
							<Card>
								<CardContent>
									<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
										{title}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">{id}</Button>
								</CardActions>
							</Card>
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
