import React from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { AppData, FoodModel } from '../../models/productModel';
import { AmountButtons } from '../../components/amountButtons';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useShoppingCart } from '../../context/cart.context';
import { CartItem } from '../../models/cart.model';
import { isFood } from '../../utils/typeGuard';
import { useProducts } from '../../hooks/useProducts';

export const CartList = () => {
	const { products } = useOutletContext<AppData>();
	const { pathname } = useLocation();
	const { getProductFromCart } = useProducts();
	const { cartItems } = useShoppingCart();
	return (
		<List>
			{cartItems?.map(({ id }: CartItem) => {
				const item = products.find(product => product.id === id) as FoodModel;
				if (item == null) return null;

				const productFromCart = isFood(item) ? getProductFromCart(cartItems, item.id) : undefined;

				return (
					<React.Fragment key={item.id}>
						<ListItem disableGutters>
							{item.image !== undefined && (
								<Box
									component={'img'}
									src={item.image[0].url}
									alt={item.image[0].alt}
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
								<AmountButtons
									showText={false}
									product={item}
									productFromCart={productFromCart}
									amountText={productFromCart?.amount}
								/>
							)}
						</ListItem>
					</React.Fragment>
				);
			})}
		</List>
	);
};
