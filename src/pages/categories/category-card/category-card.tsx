import React, { FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Card, SxProps, Typography } from '@mui/material';

import { CategoryDialog } from 'components/categoryDialog';

import { getServicesRoute } from 'utils/route';

import { theme } from 'theme/theme';

interface CategoryProps {
	title: string;
	image: string;
	isLink?: boolean;
	flowId?: string;
	userCountry?: string;
	sx: SxProps;
	imageSx?: SxProps;
	secondary?: boolean;
}

export const CategoryCard: FC<CategoryProps> = ({
	title,
	image,
	isLink = false,
	flowId = '',
	userCountry,
	sx,
	imageSx,
	secondary,
}) => {
	const [isOpened, setIsOpened] = useState(false);

	const handleOpen = () => {
		setIsOpened(true);
	};

	const handleClose = () => {
		setIsOpened(false);
	};

	const route = getServicesRoute(title);

	return (
		<Fragment key={title}>
			<Card
				onClick={isLink ? undefined : handleOpen}
				sx={{
					border: 'none',
					boxShadow: 'none',
					cursor: 'pointer',
					background: 'inherit',
					...sx,
				}}>
				<Box
					component={isLink ? Link : Box}
					to={route}
					state={flowId}
					sx={{
						background: '#404040d9',
						display: 'flex',
						flexWrap: 'wrap',
						borderRadius: theme.tg_theme.borderRadius.base,
						justifyContent: secondary ? 'center' : 'space-between',
					}}>
					<Typography sx={{ textAlign: 'center', fontWeight: '600', p: 1 }} component={'p'} variant="body1">
						{title}
					</Typography>
					<Box
						component={'img'}
						src={image}
						alt={`${title} category`}
						sx={{
							height: '5rem',
							...imageSx,
						}}
					/>
				</Box>
			</Card>
			<CategoryDialog
				handleClose={handleClose}
				flowId={flowId}
				isOpened={isOpened}
				title={title}
				image={image}
				userCountry={userCountry}
			/>
		</Fragment>
	);
};
