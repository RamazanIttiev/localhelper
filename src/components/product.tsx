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
					pb: 1,
					height: 'auto',
					borderRadius: 2,
					minHeight: '316px',
					boxShadow:
						'0px 0px 20px -8px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 8px 0px rgb(0 0 0 / 12%)',
				}}>
				{/*<Box*/}
				{/*component={Link}*/}
				{/* to={`categories/${category}/${product.title.toLowerCase()}`}*/}
				{/* onClick={() => handleSelectedProduct(product)}*/}
				{/*>*/}
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
						p: 1,
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
						<Typography variant="body2">
							<strong>Price:</strong> Rs {price}
						</Typography>
					)}
				</CardContent>
				{/*</Box>*/}
				<CardActions sx={{ flexDirection: 'column', p: '0 8px 0 8px' }}>
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
						onClick={() => sendWebAppDeepLink(idForBot, 'lhelper', { itemName: title, itemPrice: price })}>
						Buy
					</Button>
					{/*)}*/}
				</CardActions>
			</Card>
		</>
	);
};
