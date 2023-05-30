import React from 'react';
import { useCart } from '../../hooks/useCart';
import { isFood } from '../../utils/typeGuard';
import { ErrorType } from '../../models/error';
import { useProducts } from '../../hooks/useProducts';
import { MuiCarousel } from '../../components/carousel';
import { ProductModel } from '../../models/productModel';
import { ProductExtra } from './productDetails.container';
import { RadioButtons } from '../../components/radioGroup';
import { LoaderButton } from '../../reactkit/loaderButton';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { AmountButtons, CART_ACTION } from '../../components/amountButtons';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';

import dishImage from '../../assets/food.webp';

interface ProductDetailsUIProps {
	loading: boolean;
	errorState: ErrorType;
	productExtra?: ProductExtra;
	isRestaurantWorking?: boolean;
	amountButtonsVisible?: boolean;
	selectedProduct?: ProductModel;
	handleProductAmount?: (action: CART_ACTION) => void;
	handleExtra?: (event: React.SyntheticEvent) => void;
	handleProductOrder: () => Promise<Response | undefined>;
}
export const ProductDetailsUI = ({
	loading,
	errorState,
	handleExtra,
	productExtra,
	selectedProduct,
	isRestaurantWorking,
	handleProductOrder,
	handleProductAmount,
	amountButtonsVisible = false,
}: ProductDetailsUIProps) => {
	const theme = useTheme();
	const { getProductFromCart } = useProducts();
	const { cartProducts } = useCart();
	const productFromCart = isFood(selectedProduct) ? getProductFromCart(cartProducts, selectedProduct) : undefined;

	const productAmount = () => {
		if (isFood(selectedProduct) && selectedProduct.DishSize) {
			return selectedProduct?.amount !== 0 ? `${selectedProduct?.amount} x` : undefined;
		} else {
			return productFromCart ? `${productFromCart?.amount} x` : undefined;
		}
	};

	return (
		<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
			<CardMedia>
				{selectedProduct?.image !== undefined ? (
					<MuiCarousel key={selectedProduct.title} selectedProduct={selectedProduct} />
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
							variant={'body1'}
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
				{isFood(selectedProduct) && selectedProduct.DishSize && (
					<RadioButtons
						handleExtra={handleExtra}
						productExtra={productExtra}
						buttons={selectedProduct.DishSize}
					/>
				)}
			</CardContent>

			{isRestaurantWorking === undefined || isRestaurantWorking ? (
				<CardActions sx={{ flexDirection: 'column', p: 0 }}>
					{amountButtonsVisible && selectedProduct && isFood(selectedProduct) ? (
						<AmountButtons
							styles={{
								maxWidth: '13rem',
								width: productFromCart ? '13rem' : '12rem',
								background: theme.palette.background.paper,
							}}
							product={selectedProduct}
							amountText={productAmount()}
							productFromCart={productFromCart}
							handleProductAmount={handleProductAmount}
						/>
					) : (
						!isUserAgentTelegram && (
							<LoaderButton
								isMainButton
								loading={loading}
								errorState={errorState}
								handleClick={handleProductOrder}
								text={`${selectedProduct?.price} Rs`}
							/>
						)
					)}
				</CardActions>
			) : (
				<Typography
					variant="body2"
					sx={{
						padding: '0.5rem',
						width: 'fit-content',
						borderRadius: '1rem',
						background: theme.palette.background.paper,
					}}>
					We are closed
				</Typography>
			)}
		</Card>
	);
};
