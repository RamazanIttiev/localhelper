import React from 'react';
import { isFood } from '../../utils/typeGuard';
import { ErrorType } from '../../models/error.model';
import { MuiCarousel } from '../../components/carousel';
import { FoodExtraOptions, ProductModel, RestaurantModel } from '../../models/product.model';
import { RadioButtons } from '../../components/radioGroup';
import { LoaderButton } from '../../reactkit/loaderButton';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { AmountButtons, CART_ACTION } from '../../components/amountButtons';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { useShoppingCart } from '../../context/cart.context';
import { useReactRouter } from '../../hooks/useReactRouter';

import dishImage from '../../assets/food.webp';

interface ProductDetailsUIProps {
	loading: boolean;
	errorState: ErrorType;
	restaurant: RestaurantModel;
	selectedProduct: ProductModel;
	productExtra?: FoodExtraOptions;
	navigateToCheckout: () => void;
	handleProductAmount?: (action: CART_ACTION) => void;
	handleExtra?: (event: React.SyntheticEvent) => void;
}
export const ProductDetailsUI = ({
	loading,
	errorState,
	restaurant,
	handleExtra,
	productExtra,
	selectedProduct,
	handleProductAmount,
}: ProductDetailsUIProps) => {
	const theme = useTheme();

	const { getItemAmount } = useShoppingCart();
	const { isRestaurantRoute, isRestaurantDetailsRoute } = useReactRouter();

	const productAmount = getItemAmount(selectedProduct.id);

	const setProductAmount = () => {
		if (isFood(selectedProduct) && selectedProduct.dishSize) {
			return selectedProduct.amount !== 0 ? `${selectedProduct.amount} x` : undefined;
		} else {
			return productAmount > 0 ? `${productAmount} x` : undefined;
		}
	};
	console.log(selectedProduct);

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
				{isFood(selectedProduct) && selectedProduct.dishSize && (
					<RadioButtons
						handleExtra={handleExtra}
						productExtra={productExtra}
						buttons={selectedProduct.dishSize}
					/>
				)}
			</CardContent>

			{restaurant?.isWorking === undefined || restaurant?.isWorking ? (
				<CardActions sx={{ flexDirection: 'column', p: 0 }}>
					{(isRestaurantRoute || isRestaurantDetailsRoute) && selectedProduct && isFood(selectedProduct) ? (
						<AmountButtons
							styles={{
								maxWidth: '13rem',
								width: productAmount > 0 ? '13rem' : '12rem',
								background: theme.palette.background.paper,
							}}
							product={selectedProduct}
							amountText={setProductAmount()}
							handleProductAmount={handleProductAmount}
						/>
					) : (
						!isUserAgentTelegram && (
							<LoaderButton
								isMainButton
								loading={loading}
								errorState={errorState}
								// eslint-disable-next-line @typescript-eslint/no-empty-function
								handleClick={() => {}}
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
