import React from 'react';
import { useLocation } from 'react-router-dom';

import { Box, List, ListItem, Typography } from '@mui/material';

import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';

import { AmountButtons } from 'components/amountButtons';

interface Props {
	restaurantTitle?: string;
	cartList: RestaurantItem[];
}

export const CartList = ({ cartList, restaurantTitle }: Props) => {
	const { pathname } = useLocation();
	const amountButtonsShown = !pathname.includes('checkout');

	return (
		<List sx={{ p: 0 }}>
			{cartList.map(item => {
				return (
					<React.Fragment key={item.id}>
						<ListItem disableGutters>
							<Box
								component={'img'}
								src={item.image[0].url}
								alt={item.title}
								sx={{
									mr: 2,
									width: '5rem',
									borderRadius: 1,
									objectFit: 'cover',
									aspectRatio: '2/2',
								}}
							/>
							<Box
								sx={{
									width: '100%',
								}}>
								<Typography component={'h3'} variant={'body1'} gutterBottom>
									{item.title}
								</Typography>

								<Typography variant={'body2'} fontWeight={600}>
									{item.price} Rs
								</Typography>
							</Box>
							{amountButtonsShown && (
								<AmountButtons
									showPrice={false}
									showAmount
									item={item}
									restaurantTitle={restaurantTitle}
								/>
							)}
						</ListItem>
					</React.Fragment>
				);
			})}
		</List>
	);
};
