import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { Box, Button, Card, CardContent, Typography, CardActions } from '@mui/material';
import { useParams } from 'react-router-dom';

interface ProductDetailsProps {
	products: ProductModel[];
}

export const ProductDetails: FC<ProductDetailsProps> = ({ products }) => {
	const { product } = useParams();
	const selectedProduct = products.find(item => {
		return item.title === product;
	});
	return (
		<Card>
			<CardContent sx={{ m: 0, p: 2 }}>
				<Box
					component={'img'}
					src={selectedProduct?.image[0].url}
					alt={selectedProduct?.image[0].alt}
					width={'100%'}
				/>
				<Box sx={{ width: '100%', pr: 2, pl: 2 }}>
					<Typography id="transition-modal-title" variant="h6" component="h2" textAlign={'center'}>
						{selectedProduct?.title}
					</Typography>
					<Typography sx={{ mt: 2 }}>
						<strong>Price:</strong> {selectedProduct?.price}
					</Typography>
					{selectedProduct?.description && (
						<Typography sx={{ mt: 2, mb: 3 }}>
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
				<Button sx={{ height: '32px' }} variant={'contained'} fullWidth>
					Buy
				</Button>
				{/*)}*/}
			</CardActions>
		</Card>
	);
};
