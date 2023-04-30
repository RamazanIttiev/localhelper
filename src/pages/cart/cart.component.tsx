import React from 'react';
import { CartList } from './cart-list';
import { ErrorType } from '../../models/error';
import { Box, Container } from '@mui/material';
import { ProductModel } from '../../models/productModel';
import { LoaderButton } from '../../components/reactkit/loaderButton';
import { theme } from '../../theme';
import { CartHeader } from './cartHeader';
import { isUserAgentTelegram } from '../../utils/deviceInfo';

interface CartProps {
	loading: boolean;
	errorState: ErrorType;
	cartTotalAmount: number;
	handleOrder: () => void;
	cartProducts: ProductModel[] | [];
	addToCart: (product: ProductModel) => void;
	removeFromCart: (product: ProductModel) => void;
}

export const CartUI = ({
	loading,
	addToCart,
	errorState,
	handleOrder,
	cartProducts,
	removeFromCart,
	cartTotalAmount,
}: CartProps) => {
	return (
		<Container maxWidth={'md'}>
			<CartHeader />
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
						loading={loading}
						errorState={errorState}
						handleClick={handleOrder}
						styles={{ marginTop: 2 }}
						text={`${cartTotalAmount.toString()} Rs`}
					/>
				)}
			</Box>
		</Container>
	);
};
