import React, { FC, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { ErrorType } from '../models/error';
import { isProductInCart } from '../utils/cart';
import { MuiCarousel } from '../components/carousel';
import { ProductModel } from '../models/productModel';
import { AmountButtons } from '../components/amountButtons';
import { getAirtableView, useAirtableData } from '../hooks';
import { LoaderButton } from '../components/reactkit/loaderButton';
import { clearResponseMessage, handleOrder } from '../actions/global-actions';
import { Card, CardContent, CardActions, Box, Typography, CardMedia } from '@mui/material';

interface ProductDetailsProps {
	cartProducts: ProductModel[];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const ProductDetails: FC<ProductDetailsProps> = ({ cartProducts, addToCart, removeFromCart }) => {
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const routeData = useMatch('/:categoryId/:productId');
	const categoryId = useMatch('/:categoryId');

	const products = useAirtableData(routeData?.params.categoryId);

	const selectedProduct = products.find(item => {
		return item.title.toLowerCase() === routeData?.params.productId;
	});
	const productInCart = isProductInCart(cartProducts, selectedProduct);
	const idForBot = getAirtableView(categoryId?.params.categoryId);

	return (
		<Card sx={{ width: '90%', m: '0 auto', position: 'relative' }}>
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
				{(routeData?.pathname === '/food' && productInCart) || routeData?.params.productId !== undefined ? (
					<AmountButtons
						addToCart={addToCart}
						product={selectedProduct}
						productInCart={productInCart}
						removeFromCart={removeFromCart}
					/>
				) : (
					<LoaderButton
						loading={loading}
						errorState={errorState}
						text={selectedProduct?.price}
						handleClick={() => handleOrder(idForBot, selectedProduct?.title, handleLoading, handleError)}
					/>
				)}
			</CardActions>
		</Card>
	);
};
