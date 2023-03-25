import React, { FC, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { ProductModel } from '../models/productModel';
import { Card, CardActions, CardContent, CardMedia, Typography, styled } from '@mui/material';

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

interface ErrorType {
	message: string;
	isError: null | boolean;
}

const CustomLoadingButton = styled(LoadingButton)(() => ({
	'&.Mui-disabled': {
		'& > div': {
			color: '#fff',
		},
	},
}));

export const Product: FC<ProductProps> = ({ product }) => {
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const { category } = useParams();
	const { title, price, image } = product;
	const idForBot = useAirtableView(category);
	// const productInCart = isProductInCart(cart, product)

	useEffect(() => {
		console.log(errorState);
		if (errorState.isError !== null) {
			setTimeout(() => {
				setErrorState({
					message: '',
					isError: null,
				});
			}, 5000);
		}
	}, [errorState]);

	const handleClick = async () => {
		setLoading(true);
		try {
			const result = await sendWebAppDeepLink(idForBot, 'lhelper', { itemName: title, itemPrice: price });
			console.log('result');
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
		<>
			<Card
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					pb: 2,
					height: 'auto',
					borderRadius: 2,
					minHeight: '296px',
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
					<CustomLoadingButton
						loading={loading}
						color={errorState.isError ? 'error' : errorState.isError !== null ? 'success' : 'primary'}
						sx={{ height: '32px', borderRadius: 2, textTransform: 'inherit' }}
						variant={'contained'}
						fullWidth
						onClick={handleClick}>
						{errorState.isError ? (
							errorState.message
						) : errorState.isError !== null ? (
							errorState.message
						) : (
							<strong>Rs {price}</strong>
						)}
					</CustomLoadingButton>
					{/*)}*/}
				</CardActions>
			</Card>
		</>
	);
};
