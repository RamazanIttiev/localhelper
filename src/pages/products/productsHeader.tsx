import React from 'react';
import { theme } from '../../theme';
import { Box, Typography } from '@mui/material';
import { CategoryModel } from '../../models/product.model';
import { ImageLazy } from '../../components/imageLazy';

interface HeaderProps {
	category: Pick<CategoryModel, 'headerTitle' | 'headerImage'> | undefined;
}

export const ProductsHeader = ({ category }: HeaderProps) => {
	const { image, title, smallImage } = {
		title: category?.headerTitle || '',
		image: category?.headerImage[0].url || '',
		smallImage: category?.headerImage[0].thumbnails.small.url || '',
	};

	return (
		<>
			<ImageLazy
				imageUrl={image}
				smallImageUrl={smallImage}
				containerStyles={{
					display: 'block',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					width: '100%',
					objectFit: 'cover',
					height: '18rem',
				}}
			/>
			<Box
				sx={{
					top: 0,
					pb: '2rem',
					pl: '2rem',
					width: '100%',
					display: 'flex',
					height: '18rem',
					alignItems: 'flex-start',
					justifyContent: 'end',
					flexDirection: 'column',
					position: 'absolute',
					background: `linear-gradient(to bottom, rgba(255,255,255, 0), ${theme.palette.background.default})`,
				}}>
				<Typography variant={'body1'} fontSize={'2rem'}>
					{title}
				</Typography>
			</Box>
		</>
	);
};
