import React, { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Box, Typography, CardMedia, Button } from '@mui/material';
import { useMatch } from 'react-router-dom';
import { getAirtableView, useAirtableData } from '../hooks';
import { MuiCarousel } from '../components/carousel';
import { ProductModel } from '../models/productModel';
import { AmountButtons } from '../components/amountButtons';
import { isProductInCart } from '../utils/cart';
import { sendWebAppDeepLink } from '../utils/requests';
import { CustomLoadingButton } from '../components/reactkit/button';
import { ErrorType } from '../models/error';

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
		if (errorState.isError !== null) {
			setTimeout(() => {
				setErrorState({
					message: '',
					isError: null,
				});
			}, 5000);
		}
	}, [errorState]);

	const routeData = useMatch('/:categoryId/:productId');
	const categoryId = useMatch('/:categoryId');

	const products = useAirtableData(routeData?.params.categoryId);

	const selectedProduct = products.find(item => {
		return item.title.toLowerCase() === routeData?.params.productId;
	});

	const productInCart = isProductInCart(cartProducts, selectedProduct);
	const idForBot = getAirtableView(categoryId?.params.categoryId);

	const handleOrder = async () => {
		setLoading(true);
		try {
			const result = await sendWebAppDeepLink(idForBot, 'lhelper', { itemName: selectedProduct?.title });
			if (!result.ok) {
				setLoading(false);
				setErrorState({ message: 'Try again later', isError: true });
			} else {
				setErrorState({ message: 'Success', isError: false });
				setLoading(false);
			}
		} catch (error) {
			setErrorState({
				message: typeof error === 'string' ? error : 'Try again later',
				isError: true,
			});
		}
	};

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
				{routeData?.pathname === '/food' ? (
					productInCart ? (
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
					)
				) : (
					<CustomLoadingButton
						loading={loading}
						color={errorState.isError ? 'error' : errorState.isError !== null ? 'success' : 'primary'}
						sx={{ mt: 3, borderRadius: 2, textTransform: 'inherit' }}
						variant={'contained'}
						fullWidth
						onClick={handleOrder}>
						{errorState.isError ? (
							errorState.message
						) : errorState.isError !== null ? (
							errorState.message
						) : (
							<strong>Rs {selectedProduct?.price}</strong>
						)}
					</CustomLoadingButton>
				)}
			</CardActions>
		</Card>
	);
};
