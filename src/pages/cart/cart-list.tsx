import React from 'react';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import dishImage from '../../assets/food.jpg';
import { AmountButtons } from '../../components/amountButtons';
import { theme } from '../../theme';
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
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Typography
										variant={'body1'}
										sx={{
											background: theme.palette.primary.main,
											borderRadius: '50%',
											width: '24px',
											height: '24px',
											color: ' #fff',
											textAlign: ' center',
											mr: 0.5,
										}}>
										{product.amount!}
									</Typography>
									<Typography variant={'body1'}>
										x <strong>{product.price}</strong>
									</Typography>
								</Box>
							</Box>
							<AmountButtons
								product={product}
								showAmount={false}
								addToCart={addToCart}
								productFromCart={product}
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
