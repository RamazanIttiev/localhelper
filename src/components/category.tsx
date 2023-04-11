import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryDialog } from './categoryDialog';
import { setHaptic } from '../actions/webApp-actions';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

interface CategoryProps {
	title: string;
	image: string;
	isLink?: boolean;
	idForBot?: string;
}

export const Category: FC<CategoryProps> = ({ title, image, isLink = false, idForBot = '' }) => {
	const [isOpened, setIsOpened] = useState(false);

	const handleOpen = () => {
		setIsOpened(true);
	};

	const handleClose = () => {
		setIsOpened(false);
	};

	return (
		<>
			<Grid item xs={5} md={4} key={title} onClick={setHaptic('light')}>
				<Card
					onClick={handleOpen}
					sx={{
						border: 'none',
						boxShadow: 'none',
						cursor: 'pointer',
						background: 'inherit',
					}}>
					<Box component={isLink ? Link : Box} to={title.toLowerCase()}>
						<CardMedia>
							<Box
								component={'img'}
								src={image}
								alt={title}
								fontSize="small"
								sx={{
									width: '7rem',
									height: '7rem',
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
			<CategoryDialog
				handleClose={handleClose}
				idForBot={idForBot}
				isOpened={isOpened}
				title={title}
				image={image}
			/>
		</>
	);
};
