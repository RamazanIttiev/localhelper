import React from 'react';
import { useCart } from '../../hooks/useCart';
import { FoodModel } from '../../models/productModel';
import { AmountButtons } from '../../components/amountButtons';
import { Box, List, ListItem, Typography } from '@mui/material';

export const CartList = () => {
	const { cartProducts } = useCart();

	return (
		<List>
			{cartProducts.map((product: FoodModel) => {
				return (
					<React.Fragment key={product.id}>
						<ListItem disableGutters>
							{product.image !== undefined && (
								<Box
									component={'img'}
									src={product.image[0].url}
									alt={product.image[0].alt}
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
									{product.title}
								</Typography>

								<Typography variant={'body2'} fontWeight={600}>
									{product.price} Rs
								</Typography>
							</Box>
							{product && (
								<AmountButtons
									showText={false}
									product={product}
									productFromCart={product}
									amountText={product?.amount}
								/>
							)}
						</ListItem>
					</React.Fragment>
				);
			})}
		</List>
	);
};
