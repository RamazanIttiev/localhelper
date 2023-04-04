import React, { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Box, Typography, CardMedia } from '@mui/material';
import { useMatch } from 'react-router-dom';
import { getAirtableView, useAirtableData } from '../hooks';
import { sendWebAppDeepLink } from '../utils/requests';
import { ErrorType } from '../models/error';
import { CustomLoadingButton } from '../components/reactkit/button';
import { MuiCarousel } from '../components/carousel';

interface ProductDetailsProps {}

export const ProductDetails: FC<ProductDetailsProps> = () => {
	const pathData = useMatch('/:categoryId/:productId');
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const idForBot = getAirtableView(pathData?.params.categoryId);

	const products = useAirtableData(pathData?.params.categoryId);

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

	const selectedProduct = products.find(item => {
		return item.title.toLowerCase() === pathData?.params.productId;
	});

	const handleClick = async () => {
		setLoading(true);
		try {
			const result = await sendWebAppDeepLink(idForBot, 'lhelper', {
				itemName: selectedProduct?.title,
				itemPrice: selectedProduct?.price,
			});
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
		<Card>
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

			<CardActions>
				{/*{productInCart ? (*/}
				{/*	<AmountButtons*/}
				{/*		product={selectedProduct}*/}
				{/*		amount={productInCart.amount}*/}
				{/*		addToCart={addToCart}*/}
				{/*		removeFromCart={removeFromCart}*/}
				{/*	/>*/}
				{/*) : (*/}

				<CustomLoadingButton
					loading={loading}
					color={errorState.isError ? 'error' : errorState.isError !== null ? 'success' : 'primary'}
					sx={{ borderRadius: 2, textTransform: 'inherit' }}
					variant={'contained'}
					fullWidth
					onClick={handleClick}>
					{errorState.isError ? (
						errorState.message
					) : errorState.isError !== null ? (
						errorState.message
					) : (
						<strong>Rs {selectedProduct?.price}</strong>
					)}
				</CustomLoadingButton>
				{/*)}*/}
			</CardActions>
		</Card>
	);
};
