import React, { FC } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { categories } from '../mock/categories';
import { Category } from '../models/categories';
import { Link } from 'react-router-dom';

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
	return (
		<Grid container justifyContent={'center'} spacing={4} sx={{ pt: 3 }}>
			{categories.map(({ title, image }: Category) => {
				return (
					<Grid item xs={5} key={title}>
						<Card
							sx={{
								height: '8rem',
								pt: 1,
								pb: 1,
								boxShadow:
									'0px 0px 20px -8px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 8px 0px rgb(0 0 0 / 12%)',
							}}>
							<Link
								to={`categories/${title.toLowerCase()}`}
								style={{
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}>
								<CardMedia sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
									<Box component={'img'} src={image} alt={title} fontSize="small" width={'50%'} />
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
