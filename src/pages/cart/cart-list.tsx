import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AmountButtons } from '../../components/amountButtons';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useShoppingCart } from '../../context/cart.context';
import { useQuery } from '@tanstack/react-query';
import { restaurantProductsQuery } from '../../api/airtable/restaurant';
import { RestaurantProductModel } from '../restaurant/components/restaurant-product/restaurant-product.model';

export const CartList = () => {
	const { pathname } = useLocation();
	const { restaurantId } = useParams();

	const { data: products } = useQuery<RestaurantProductModel[]>(restaurantProductsQuery(restaurantId));
	const { cartItems, findProduct } = useShoppingCart();

	return (
		<List>
			{cartItems?.map(product => {
				const item = findProduct(products!, product.id);

				if (item === undefined) return null;

				return (
					<React.Fragment key={item.id}>
						<ListItem disableGutters>
							{item.image !== undefined && (
								<Box
									component={'img'}
									src={item.image}
									alt={item.title}
									sx={{
										mr: 2,
										width: '5rem',
										borderRadius: 1,
										objectFit: 'cover',
										aspectRatio: '2/2',
									}}
								/>
							)}
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
							{item && pathname !== '/checkout' && (
								<AmountButtons showText={false} product={item} restaurantTitle={''} />
							)}
						</ListItem>
					</React.Fragment>
				);
			})}
		</List>
	);
};
