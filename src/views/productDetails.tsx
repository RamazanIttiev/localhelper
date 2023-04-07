import React, { FC } from 'react';
import { Card, CardContent, CardActions, Box, Typography, CardMedia, Button } from '@mui/material';
import { useMatch } from 'react-router-dom';
import { useAirtableData } from '../hooks';
import { MuiCarousel } from '../components/carousel';
import { ProductModel } from '../models/productModel';
import { AmountButtons } from '../components/amountButtons';
import { isProductInCart } from '../utils/cart';

interface ProductDetailsProps {
	cartProducts: ProductModel[];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const ProductDetails: FC<ProductDetailsProps> = ({ cartProducts, addToCart, removeFromCart }) => {
	const pathData = useMatch('/:categoryId/:productId');

	const products = useAirtableData(pathData?.params.categoryId);

	const selectedProduct = products.find(item => {
		return item.title.toLowerCase() === pathData?.params.productId;
	});

	const productInCart = isProductInCart(cartProducts, selectedProduct);

	return (
		<Card sx={{ width: '90%', m: '0 auto' }}>
			<CardMedia>
				{selectedProduct?.image !== undefined ? (
					<MuiCarousel selectedProduct={selectedProduct} />
				) : (
					<Typography
						fontSize={'small'}
						sx={{
							p: 1,
							height: '20rem',
							display: 'flex',
							alignItems: 'center',
							fontFamily: 'monospace',
							justifyContent: 'center',
						}}>
						Image is not loaded ;(
					</Typography>
				)}
			</CardMedia>

			<CardContent sx={{ m: 0, p: 2 }}>
				<Box sx={{ width: '100%', pr: 2, pl: 2 }}>
					<Typography id="transition-modal-title" variant="h6" component="h2" textAlign={'center'}>
						{selectedProduct?.title}
					</Typography>
					{selectedProduct?.description && (
						<Typography sx={{ mt: 2 }}>
							<strong>Description:</strong>
							<br />
							<br />
							{selectedProduct?.description}
						</Typography>
					)}
				</Box>
			</CardContent>

			<CardActions sx={{ flexDirection: 'column', p: '0 16px 16px 16px' }}>
				{productInCart ? (
					<AmountButtons
						product={selectedProduct!}
						amount={productInCart.amount!}
						addToCart={addToCart}
						removeFromCart={removeFromCart}
					/>
				) : (
					<Button
						sx={{ borderRadius: 2, textTransform: 'inherit' }}
						variant={'contained'}
						fullWidth
						onClick={() => addToCart(selectedProduct!)}>
						<strong>Rs {selectedProduct?.price}</strong>
					</Button>
				)}
			</CardActions>
		</Card>
	);
};
