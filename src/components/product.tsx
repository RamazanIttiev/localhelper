import React, { FC } from 'react';

import { ProductModel } from '../models/productModel';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import { isProductInCart } from '../utils/cart';
import { AmountButtons } from './amountButtons';

interface ProductProps {
	product: ProductModel;
	cartProducts: ProductModel[];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const Product: FC<ProductProps> = ({ cartProducts, product, addToCart, removeFromCart }) => {
	const { title, price, image } = product;
	const productInCart = isProductInCart(cartProducts, product);

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				pb: 2,
				height: 'auto',
				borderRadius: 2,
				minHeight: '296px',
			}}>
			<Link to={title.toLowerCase()}>
				{image ? (
					<CardMedia component="img" image={image[0].url} alt={image[0].alt} sx={{ height: '11rem' }} />
				) : (
					<Typography
						fontSize={'small'}
						sx={{
							p: 1,
							height: '10rem',
							display: 'flex',
							alignItems: 'center',
							fontFamily: 'monospace',
							justifyContent: 'center',
						}}>
						Image is not loaded ;(
					</Typography>
				)}
				<CardContent
					sx={{
						'&:last-child': { pb: 0, pt: 0.5 },
						height: '100%',
						display: 'flex',
						alignItems: 'baseline',
						flexDirection: 'column',
						justifyContent: 'center',
						m: '8px auto',
					}}>
					<Typography
						sx={{
							mb: 1,
							m: '0px auto',
							display: 'flex',
							fontSize: '16px',
							fontWeight: '600',
							alignItems: 'center',
							justifyContent: 'center',
							textTransform: 'capitalize',
						}}
						component="h3">
						{title.toLowerCase()}
					</Typography>
				</CardContent>
			</Link>
			<CardActions sx={{ flexDirection: 'column', p: '0 16px 0 16px' }}>
				{productInCart ? (
					<AmountButtons
						product={product}
						amount={productInCart.amount!}
						addToCart={addToCart}
						removeFromCart={removeFromCart}
					/>
				) : (
					<Button
						sx={{ borderRadius: 2, textTransform: 'inherit' }}
						variant={'contained'}
						fullWidth
						onClick={() => addToCart(product)}>
						<strong>Rs {price}</strong>
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
