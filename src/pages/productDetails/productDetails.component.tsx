import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { MuiCarousel } from '../../components/carousel';
import { AmountButtons } from '../../components/amountButtons';
import { LoaderButton } from '../../reactkit/loaderButton';
import { ProductModel } from '../../models/productModel';
import { ErrorType } from '../../models/error';

import dishImage from '../../assets/food.webp';
import { isUserAgentTelegram } from '../../utils/deviceInfo';

interface ProductDetailsUIProps {
	loading: boolean;
	errorState: ErrorType;
	isRestaurantOpened?: boolean;
	productFromCart?: ProductModel;
	amountButtonsVisible?: boolean;
	selectedProduct?: ProductModel;
	handleProductOrder: () => Promise<Response | undefined>;
	addToCart: (selectedProduct: ProductModel) => void;
	removeFromCart: (selectedProduct: ProductModel) => void;
}
export const ProductDetailsUI = ({
	loading,
	addToCart,
	errorState,
	productFromCart,
	removeFromCart,
	selectedProduct,
	handleProductOrder,
	isRestaurantOpened = true,
	amountButtonsVisible = false,
}: ProductDetailsUIProps) => {
	const theme = useTheme();

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

			{isRestaurantOpened ? (
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
							removeFromCart={removeFromCart}
							productFromCart={productFromCart}
							amountText={
								productFromCart?.amount === undefined ? undefined : `${productFromCart?.amount} x`
							}
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
