import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Grid, Icon, Typography } from '@mui/material';
import { categories } from '../utils/categories';
import { Category } from '../models/categories';
import { Link } from 'react-router-dom';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
	return (
		<Grid container spacing={2} sx={{ pt: 3 }}>
			{categories.map(({ title, icon }: Category) => {
				return (
					<Grid item xs={6} key={title}>
						<Card
							sx={{
								height: 'auto',
								pt: 1,
								pb: 1,
								boxShadow:
									'0px 0px 20px -8px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 8px 0px rgb(0 0 0 / 12%)',
							}}>
							<Link to={`categories/${title.toLowerCase()}`}>
								<CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
									<Icon fontSize="large">{icon}</Icon>
								</CardMedia>
								<CardContent sx={{ '&:last-child': { pb: 0, pt: 0.5 } }}>
									<Typography sx={{ textAlign: 'center' }} variant="h5">
										{title}
									</Typography>
								</CardContent>
							</Link>
						</Card>
					</Grid>
				);
			})}
		</Grid>
	);
};
