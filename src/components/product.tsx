import React, { FC, useEffect, useState } from 'react';

import { ProductModel } from '../models/productModel';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { getAirtableView } from '../hooks';
import { Link, useParams } from 'react-router-dom';
import { sendWebAppDeepLink } from '../utils/requests';
import { CustomLoadingButton } from './reactkit/button';
import { ErrorType } from '../models/error';

interface ProductProps {
	product: ProductModel;
	// cart: Product[];
	// removeFromCart: (product: Product) => void;
	// addToCart: (selectedProduct: Product) => void;
}

export const Product: FC<ProductProps> = ({ product }) => {
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	const { categoryId } = useParams();
	const { title, price, image } = product;
	const idForBot = getAirtableView(categoryId);
	// const productInCart = isProductInCart(cart, product)

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

	const handleClick = async () => {
		setLoading(true);
		try {
			const result = await sendWebAppDeepLink(idForBot, 'lhelper', { itemName: title, itemPrice: price });
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
			<Link to={title.toLowerCase()}>
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
						m: '8px auto',
					}}>
					<Typography
						sx={{
							mb: 1,
							m: '0px auto',
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
			</Link>
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
	);
};
