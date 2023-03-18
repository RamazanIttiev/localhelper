import React, { FC } from 'react';

import { ProductModel } from '../models/productModel';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { useAirtableView } from '../hooks';
import { useParams } from 'react-router-dom';
import { sendWebAppDeepLink } from '../utils/requests';

interface ProductProps {
	product: ProductModel;
	// cart: ProductModel[];
	// removeFromCart: (product: ProductModel) => void;
	// addToCart: (selectedProduct: ProductModel) => void;
	handleSelectedProduct: (currentProduct: ProductModel) => void;
	// handleOpenModal: (currentProduct: ProductModel | null) => void;
}

export const Product: FC<ProductProps> = ({ product }) => {
	const { category } = useParams();

	const { title, price, image } = product;
	const idForBot = useAirtableView(category);
	// const productInCart = isProductInCart(cart, product)
	return (
		<>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					pb: 2,
					height: 'auto',
					borderRadius: 2,
					minHeight: '264px',
				}}>
				{image ? (
					<CardMedia component="img" image={image[0].url} alt={image[0].alt} sx={{ height: '10rem' }} />
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
					}}>
					<Typography
						sx={{
							mb: 1,
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
				{/*</Box>*/}
				<CardActions sx={{ flexDirection: 'column', p: '0 16px 0 16px' }}>
					{/*{productInCart ? (*/}
					{/*	<AmountButtons*/}
					{/*		product={product}*/}
					{/*		amount={productInCart.amount}*/}
					{/*		addToCart={addToCart}*/}
					{/*		removeFromCart={removeFromCart}*/}
					{/*	/>*/}
					{/*) : (*/}
					<Button
						sx={{ height: '32px', borderRadius: 2, textTransform: 'capitalize' }}
						variant={'contained'}
						fullWidth
						onClick={() => sendWebAppDeepLink(idForBot, 'lhelper', { itemName: title, itemPrice: price })}>
						Rs&nbsp;<strong>{price}</strong>
					</Button>
					{/*)}*/}
				</CardActions>
			</Card>
		</>
	);
};
