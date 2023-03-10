import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
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

	const { title, place, price, image } = product;
	const idForBot = useAirtableView(category);
	// const productInCart = isProductInCart(cart, product)
	return (
		<>
			<Card
				sx={{
					height: 'auto',
					pb: 1,
					boxShadow:
						'0px 0px 20px -8px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 8px 0px rgb(0 0 0 / 12%)',
				}}>
				<Box
				// component={Link}
				// to={`categories/${category}/${product.title.toLowerCase()}`}
				// onClick={() => handleSelectedProduct(product)}
				>
					{image && (
						<CardMedia component="img" image={image[0].url} alt={image[0].alt} sx={{ height: '10rem' }} />
					)}
					<CardContent sx={{ '&:last-child': { pb: 0, pt: 0.5 } }}>
						<Typography
							sx={{
								m: 1,
								height: '48px',
								fontSize: '16px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								textTransform: 'capitalize',
							}}
							component="h3">
							{title.toLowerCase()}
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
					<Button
						sx={{ height: '32px' }}
						variant={'outlined'}
						fullWidth
						onClick={() =>
							sendWebAppDeepLink(
								idForBot,
								'lhelper',
								title !== ('Bonus' || 'Exchange') ? { itemName: title, itemPrice: price } : {},
							)
						}>
						Buy
					</Button>
					{/*)}*/}
				</CardActions>
			</Card>
		</>
	);
};
