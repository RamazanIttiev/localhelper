import React from 'react';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import dishImage from '../../assets/food.jpg';
import { AmountButtons } from '../../components/amountButtons';
import { ProductModel } from '../../models/productModel';

interface CartListProps {
	cartProducts: ProductModel[];
	addToCart: (product: ProductModel) => void;
	removeFromCart: (product: ProductModel) => void;
}

export const CartList = ({ cartProducts, addToCart, removeFromCart }: CartListProps) => {
	return (
		<List sx={{ pb: '5rem' }}>
			{cartProducts.map(product => {
				return (
					<React.Fragment key={product.id}>
						<ListItem disableGutters>
							{product.image !== undefined ? (
								<Box
									component={'img'}
									src={product.image[0].url}
									alt={product.image[0].alt}
									sx={{ width: '25%', borderRadius: 1, mr: 2 }}
								/>
							) : (
								<Box
									component={'img'}
									src={dishImage}
									alt={product.title}
									sx={{ width: '25%', borderRadius: 1, mr: 2 }}
								/>
							)}
							<Box
								sx={{
									width: '100%',
								}}>
								<Typography component={'h3'} variant={'h6'} gutterBottom>
									{product.title}
								</Typography>

								<Typography variant={'body1'} fontWeight={600}>
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
						<Divider />
					</React.Fragment>
				);
			})}
		</List>
	);
};
