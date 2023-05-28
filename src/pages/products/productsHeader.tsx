import React from 'react';
import { theme } from '../../theme';
import { Box, Icon, Typography } from '@mui/material';
import { WorkingStatus } from '../../reactkit/workingStatus';
import { useReactRouter } from '../../hooks/useReactRouter';
import { CategoryModel, RestaurantModel } from '../../models/productModel';

interface HeaderProps {
	category: Pick<CategoryModel, 'HeaderTitle' | 'HeaderImage'> | undefined;
	restaurant: Pick<RestaurantModel, 'WorkingTime' | 'WorkingStatus' | 'Image' | 'Location' | 'Title'> | undefined;
}

export const ProductsHeader = ({ restaurant, category }: HeaderProps) => {
	const { isRestaurantRoute } = useReactRouter();

	const { image, title } = {
		title: category?.HeaderTitle || restaurant?.Title,
		image: (category?.HeaderImage !== undefined && category?.HeaderImage[0]?.url) || restaurant?.Image[0]?.url,
	};

	return (
		<>
			{image && (
				<Box
					component="img"
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
			)}
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
				{isRestaurantRoute && restaurant && (
					<Box
						sx={{
							width: '9rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'baseline',
							justifyContent: 'space-between',
						}}>
						<Box sx={{ marginBottom: '1rem' }}>
							<WorkingStatus
								workingStatus={restaurant?.WorkingStatus}
								workingTime={restaurant?.WorkingTime}
							/>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
							<Icon
								fontSize={'small'}
								sx={{
									marginRight: '0.2rem',
								}}>
								location_on
							</Icon>
							<Typography component="p" variant={'body1'}>
								{restaurant?.Location}
							</Typography>
						</Box>
					</Box>
				)}
			</Box>
		</>
	);
};
