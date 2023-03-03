import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductProps {
	product: ProductModel;
	// cart: ProductModel[];
	// removeFromCart: (product: ProductModel) => void;
	// addToCart: (selectedProduct: ProductModel) => void;
	handleOpenModal: (currentProduct: ProductModel | null) => void;
}

export const Product: FC<ProductProps> = ({ product, handleOpenModal }) => {
	const { title, place, price, image } = product;

	// const productInCart = isProductInCart(cart, product);

	return (
		<Card
			sx={{
				height: 'auto',
				pt: 1,
				pb: 1,
				boxShadow:
					'0px 0px 20px -8px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 8px 0px rgb(0 0 0 / 12%)',
			}}>
			<Box onClick={() => handleOpenModal(product)}>
				<CardMedia
					component="img"
					image={image[0].url}
					alt={image[0].alt}
					sx={{ width: '50%', margin: '0 auto', borderRadius: '8px' }}
				/>
				<CardContent sx={{ '&:last-child': { pb: 0, pt: 0.5 } }}>
					<Typography sx={{ mb: 2, textAlign: 'center' }} variant="h5">
						{title}
					</Typography>
					{price && (
						<Typography gutterBottom variant="body2">
							<strong>Price:</strong> Rs {price}
						</Typography>
					)}
					{place && (
						<Typography gutterBottom variant="body2">
							<strong>Place:</strong> {place}
						</Typography>
					)}
				</CardContent>
			</Box>
			<CardActions sx={{ flexDirection: 'column', pb: 0 }}>
				{/*{productInCart ? (*/}
				{/*	<AmountButtons*/}
				{/*		product={product}*/}
				{/*		amount={productInCart.amount}*/}
				{/*		addToCart={addToCart}*/}
				{/*		removeFromCart={removeFromCart}*/}
				{/*	/>*/}
				{/*) : (*/}
				<Button sx={{ height: '32px' }} variant={'contained'} fullWidth>
					Buy
				</Button>
				{/*)}*/}
			</CardActions>
		</Card>
	);
};
