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

export const Category: FC<CategoryProps> = ({ title, image, isLink, idForBot = '' }) => {
	return (
		<Grid item xs={5} md={4} key={title}>
			<Card
				onClick={() => {
					!isLink && sendWebAppDeepLink(idForBot, 'lhelper', {});
				}}
				sx={{
					borderRadius: '50%',
					width: '8rem',
					height: '8rem',
					m: '0 auto',
					pt: 2,
					pb: 2,
					cursor: 'pointer',
					boxShadow:
						'0px 0px 20px -8px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 8px 0px rgb(0 0 0 / 12%)',
				}}>
				<Box
					component={isLink ? Link : Box}
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
					<CardContent sx={{ '&:last-child': { p: 0.5 } }}>
						<Typography sx={{ textAlign: 'center' }} component={'p'} variant="body1">
							{title}
						</Typography>
					</CardContent>
				</Box>
			</Card>
		</Grid>
	);
};
export default Category;
