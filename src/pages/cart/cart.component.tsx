import React from 'react';
import { CartList } from './cart-list';
import { ErrorType } from '../../models/error';
import { Box } from '@mui/material';
import { ProductModel } from '../../models/productModel';
import { LoaderButton } from '../../components/reactkit/loaderButton';
import { theme } from '../../theme';
import { CartHeader } from './cartHeader';
import { isUserAgentTelegram } from '../../utils/deviceInfo';

interface CartProps {
	errorState: ErrorType;
	restaurantTitle?: string;
	navigateToCheckout: () => void;
	cartProducts: ProductModel[] | [];
	addToCart: (product: ProductModel) => void;
	removeFromCart: (product: ProductModel) => void;
}

export const CartUI = ({ addToCart, cartProducts, removeFromCart, restaurantTitle, navigateToCheckout }: CartProps) => {
	return (
		<>
			<CartHeader restaurantTitle={restaurantTitle} />
			<CartList addToCart={addToCart} removeFromCart={removeFromCart} cartProducts={cartProducts} />
			<Box
				sx={{
					left: 0,
					bottom: 0,
					width: '100%',
					position: 'fixed',
					padding: 2,
					backgroundColor: theme.palette.background.default,
				}}>
				{!isUserAgentTelegram && (
					<LoaderButton
						fullWidth
						isMainButton
						styles={{ marginTop: 2 }}
						errorState={{ isError: null }}
						handleClick={navigateToCheckout}
						text={'Checkout'}
					/>
				)}
			</Box>
		</>
	);
};
