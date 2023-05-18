import React from 'react';
import { theme } from '../../theme';
import { Box } from '@mui/material';
import { CartList } from './cart-list';
import { CartHeader } from './cartHeader';
import { ProductModel } from '../../models/productModel';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { LoaderButton } from '../../reactkit/loaderButton';

interface CartProps {
	restaurantTitle?: string;
	restaurantWorkingTime: string;
	isRestaurantWorking?: boolean;
	navigateToCheckout: () => void;
	cartProducts: ProductModel[] | [];
	addToCart: (product: ProductModel) => void;
	removeFromCart: (product: ProductModel) => void;
}

export const CartUI = ({
	addToCart,
	cartProducts,
	removeFromCart,
	restaurantTitle,
	navigateToCheckout,
	isRestaurantWorking,
	restaurantWorkingTime,
}: CartProps) => {
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
						isMainButton
						disabled={!isRestaurantWorking}
						handleClick={navigateToCheckout}
						text={isRestaurantWorking ? 'Checkout' : `Working time - ${restaurantWorkingTime}`}
					/>
				)}
			</Box>
		</>
	);
};
