import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { MuiCarousel } from '../carousel';
import { AmountButtons } from '../amountButtons';
import { LoaderButton } from '../reactkit/loaderButton';
import { handleOrder } from '../../actions/global-actions';
import { ProductModel } from './models/productModel';
import { ErrorType } from '../../models/error';

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
		<Card sx={{ width: '90%', m: '0 auto', position: 'relative', background: 'transparent', boxShadow: 'none' }}>
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

			<CardActions sx={{ flexDirection: 'column', m: '2rem 0' }}>
				{amountButtonsVisible ? (
					<AmountButtons
						styles={{
							maxWidth: '9rem',
							width: productFromCart ? '9rem' : '8rem',
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
