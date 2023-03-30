import React, { FC } from 'react';
import { Button, Card, CardContent, CardActions, Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ProductModel } from '../models/productModel';

interface ProductDetailsProps {
	products: ProductModel[];
}

export const ProductDetails: FC<ProductDetailsProps> = ({ products }) => {
	const { productId } = useParams();

	const selectedProduct = products.find(item => {
		return item.title.toLowerCase() === productId;
	});
	console.log(products);
	return (
		<Card>
			<CardContent sx={{ m: 0, p: 2 }}>
				{selectedProduct?.image ? (
					<Box
						component={'img'}
						src={selectedProduct?.image[0].url}
						alt={selectedProduct?.image[0].alt}
						width={'100%'}
						sx={{ borderRadius: 0.5 }}
					/>
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
				<Box sx={{ width: '100%', pr: 2, pl: 2 }}>
					<Typography id="transition-modal-title" variant="h6" component="h2" textAlign={'center'}>
						{selectedProduct?.title}
					</Typography>
					<Typography sx={{ mt: 2 }}>
						<strong>Price:</strong> {selectedProduct?.price}
					</Typography>
					{selectedProduct?.description && (
						<Typography sx={{ mt: 2 }}>
							<strong>Description:</strong> {selectedProduct?.description}
						</Typography>
					)}
				</Box>
			</CardContent>

			<CardActions>
				{/*{productInCart ? (*/}
				{/*	<AmountButtons*/}
				{/*		product={selectedProduct}*/}
				{/*		amount={productInCart.amount}*/}
				{/*		addToCart={addToCart}*/}
				{/*		removeFromCart={removeFromCart}*/}
				{/*	/>*/}
				{/*) : (*/}
				<Button variant={'contained'} fullWidth>
					Buy
				</Button>
				{/*)}*/}
			</CardActions>
		</Card>
	);
};
