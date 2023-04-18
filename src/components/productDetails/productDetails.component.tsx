import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { MuiCarousel } from '../carousel';
import { AmountButtons } from '../amountButtons';
import { LoaderButton } from '../reactkit/loaderButton';
import { handleOrder } from '../../actions/global-actions';
import { ProductModel } from '../../models/productModel';
import { ErrorType } from '../../models/error';

import dishImage from '../../assets/food.jpg';

interface ProductDetailsUIProps {
	idForBot: string;
	loading: boolean;
	errorState: ErrorType;
	productFromCart?: ProductModel;
	amountButtonsVisible?: boolean;
	selectedProduct?: ProductModel;
	handleError: (value: ErrorType) => void;
	handleLoading: (value: boolean) => void;
	addToCart: (selectedProduct: ProductModel) => void;
	removeFromCart: (selectedProduct: ProductModel) => void;
	order: { order: string; itemName?: undefined } | { itemName: string; order?: undefined };
}
export const ProductDetailsUI = ({
	order,
	loading,
	idForBot,
	addToCart,
	errorState,
	handleError,
	handleLoading,
	productFromCart,
	removeFromCart,
	selectedProduct,
	amountButtonsVisible = false,
}: ProductDetailsUIProps) => {
	const theme = useTheme();

	return (
		<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
			<CardMedia>
				{selectedProduct?.image !== undefined ? (
					<MuiCarousel selectedProduct={selectedProduct} />
				) : (
					<Box
						component={'img'}
						src={dishImage}
						alt={selectedProduct?.title}
						width={'100%'}
						sx={{
							borderRadius: 3,
							height: '20rem',
							margin: '0 auto',
							display: 'block',
							objectFit: 'cover',
						}}
					/>
				)}
			</CardMedia>

			<CardContent sx={{ m: '2rem 0', p: 0 }}>
				<Box sx={{ width: '100%' }}>
					<Typography id="transition-modal-title" variant="h5" component="h2" fontWeight={700}>
						{selectedProduct?.title}
					</Typography>
					{selectedProduct?.description && (
						<Typography sx={{ mt: 2, color: theme.typography.subtitle1 }}>
							{selectedProduct?.description}
						</Typography>
					)}
				</Box>
			</CardContent>

			<CardActions sx={{ flexDirection: 'column', p: 0 }}>
				{amountButtonsVisible ? (
					<AmountButtons
						styles={{
							maxWidth: '13rem',
							width: productFromCart ? '13rem' : '12rem',
							background: productFromCart ? theme.palette.primary.main : theme.palette.background.default,
						}}
						addToCart={addToCart}
						product={selectedProduct}
						productFromCart={productFromCart}
						removeFromCart={removeFromCart}
					/>
				) : (
					<LoaderButton
						loading={loading}
						errorState={errorState}
						text={selectedProduct?.price}
						handleClick={() => handleOrder(idForBot, order, handleLoading, handleError)}
					/>
				)}
			</CardActions>
		</Card>
	);
};
