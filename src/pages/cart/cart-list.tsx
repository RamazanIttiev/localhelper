import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { AmountButtons } from '../../components/amountButtons';
import { ProductModel } from '../../models/productModel';

interface CartListProps {
	cartProducts: ProductModel[];
	addToCart: (product: ProductModel) => void;
	removeFromCart: (product: ProductModel) => void;
}

export const CartList = ({ cartProducts, addToCart, removeFromCart }: CartListProps) => {
	return (
		<List sx={{ pb: '4rem' }}>
			{cartProducts.map(product => {
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
							<AmountButtons
								showText={false}
								product={product}
								addToCart={addToCart}
								productFromCart={product}
								amountText={product?.amount}
								removeFromCart={removeFromCart}
							/>
						</ListItem>
					</React.Fragment>
				);
			})}
		</List>
	);
};
