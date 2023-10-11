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
	sx?: SxProps;
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
				component={isLink ? Link : Box}
				to={route}
				state={{ item: {}, flowId }}
				sx={{
					border: 'none',
					boxShadow: 'none',
					cursor: 'pointer',
					background: theme.tg_theme.palette.bg_color,
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					borderRadius: theme.tg_theme.borderRadius.base,
					justifyContent: secondary ? 'center' : 'space-between',
					...sx,
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
