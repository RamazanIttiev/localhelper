import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { MuiCarousel } from '../../components/carousel';
import { AmountButtons } from '../../components/amountButtons';
import { LoaderButton } from '../../components/reactkit/loaderButton';
import { handleOrder } from '../../actions/global-actions';
import { ProductModel } from '../../models/productModel';
import { ErrorType } from '../../models/error';

import dishImage from '../../assets/food.jpg';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { SingleOrderData } from '../../models/orderData';

interface ProductDetailsUIProps {
	flowId: string;
	loading: boolean;
	errorState: ErrorType;
	order: SingleOrderData;
	productFromCart?: ProductModel;
	amountButtonsVisible?: boolean;
	selectedProduct?: ProductModel;
	handleError: (value: ErrorType) => void;
	handleLoading: (value: boolean) => void;
	addToCart: (selectedProduct: ProductModel) => void;
	removeFromCart: (selectedProduct: ProductModel) => void;
}
export const ProductDetailsUI = ({
	order,
	loading,
	flowId,
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
					<Typography id="transition-modal-title" variant="h6" component="h2" fontWeight={700}>
						{selectedProduct?.title}
					</Typography>
					{selectedProduct?.description && (
						<Typography
							variant={'subtitle2'}
							sx={{
								mt: 2,
								padding: '1rem',
								borderRadius: '1rem',
								color: '#fff',
								background: '#303030',
							}}>
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
							background: theme.palette.background.paper,
						}}
						addToCart={addToCart}
						product={selectedProduct}
						productFromCart={productFromCart}
						removeFromCart={removeFromCart}
					/>
				) : (
					!isUserAgentTelegram && (
						<LoaderButton
							loading={loading}
							errorState={errorState}
							text={selectedProduct?.price}
							handleClick={() => handleOrder(flowId, order, handleLoading, handleError)}
						/>
					)
				)}
			</CardActions>
		</Card>
	);
};
