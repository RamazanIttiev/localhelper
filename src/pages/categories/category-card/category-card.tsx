import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { theme } from 'theme';

import { CategoryDialog } from 'components/categoryDialog';

import { getServicesRoute } from 'utils/route';

interface CategoryProps {
	title: string;
	image: string;
	isLink?: boolean;
	flowId?: string;
	userCountry?: string;
}

export const CategoryCard: FC<CategoryProps> = ({ title, image, isLink = false, flowId = '', userCountry }) => {
	const [isOpened, setIsOpened] = useState(false);

	const handleOpen = () => {
		setIsOpened(true);
	};

	const handleClose = () => {
		setIsOpened(false);
	};

	const route = getServicesRoute(title);

	return (
		<>
			<Grid item xs={5} sm={4} md={4} key={title}>
				<Card
					onClick={isLink ? undefined : handleOpen}
					sx={{
						border: 'none',
						boxShadow: 'none',
						cursor: 'pointer',
						background: 'inherit',
					}}>
					<Box
						component={isLink ? Link : Box}
						to={route}
						state={flowId}
						sx={{
							background: '#404040d9',
							display: 'flex',
							borderRadius: theme.tg_theme.borderRadius.base,
							height: '7rem',
							position: 'relative',
						}}>
						<CardContent sx={{ '&:last-child': { p: 0.5 } }}>
							<Typography sx={{ textAlign: 'center', fontWeight: '600' }} component={'p'} variant="body1">
								{title}
							</Typography>
						</CardContent>
						<Box
							component={'img'}
							src={image}
							alt={`${title} category`}
							fontSize="small"
							sx={{
								height: '6rem',
								display: 'block',
								position: 'absolute',
								bottom: '0',
								right: '0',
							}}
						/>
					</Box>
				</Card>
			</Grid>
			<CategoryDialog
				handleClose={handleClose}
				flowId={flowId}
				isOpened={isOpened}
				title={title}
				image={image}
				userCountry={userCountry}
			/>
		</>
	);
};
