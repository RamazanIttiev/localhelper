import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { sendWebAppDeepLink } from '../utils/requests';

interface CategoryProps {
	title: string;
	image: string;
	isLink?: boolean;
	idForBot?: string;
}

export const Category: FC<CategoryProps> = ({ title, image, isLink = false, idForBot = '' }) => {
	return (
		<Grid item xs={5} md={4} key={title}>
			<Card
				onClick={() => {
					!isLink && sendWebAppDeepLink(idForBot, 'lhelper', {});
				}}
				sx={{
					border: 'none',
					boxShadow: 'none',
					cursor: 'pointer',
					background: 'inherit',
				}}>
				<Box component={isLink ? Link : Box} to={`categories/${title.toLowerCase()}`}>
					<CardMedia>
						<Box
							component={'img'}
							src={image}
							alt={title}
							fontSize="small"
							sx={{
								width: '8rem',
								height: '8rem',
								display: 'block',
								margin: '0 auto',
								borderRadius: '50%',
							}}
						/>
					</CardMedia>
					<CardContent sx={{ '&:last-child': { p: 0.5 }, mt: 1 }}>
						<Typography sx={{ textAlign: 'center', fontWeight: '600' }} component={'p'} variant="body1">
							{title}
						</Typography>
					</CardContent>
				</Box>
			</Card>
		</Grid>
	);
};
export default Category;
