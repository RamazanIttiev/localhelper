import { Box, Typography } from '@mui/material';

import { Category } from 'pages/categories/category.model.ts';

import { theme } from 'ui/theme/theme.ts';

interface HeaderProps {
	category: Pick<Category, 'headerTitle' | 'headerImage'> | undefined;
}

export const ItemsHeader = ({ category }: HeaderProps) => {
	const { image, title } = {
		title: category?.headerTitle || '',
		image: category?.headerImage[0].url || '',
	};

	return (
		<>
			<Box
				component={'img'}
				src={image}
				alt={title}
				sx={{
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
