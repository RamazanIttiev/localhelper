import React from 'react';
import { CartList } from './cart-list';
import { ErrorType } from '../../models/error';
import { Box, Container, Typography } from '@mui/material';
import { ProductModel } from '../../models/productModel';
import { LoaderButton } from '../../components/reactkit/loaderButton';
import { theme } from '../../theme';
import { CartHeader } from './cartHeader';

interface CartProps {
	loading: boolean;
	isCartOpened: boolean;
	errorState: ErrorType;
	clearCart?: () => void;
	cartTotalAmount: number;
	handleOrder: () => void;
	cartProducts: ProductModel[] | [];
	addToCart: (product: ProductModel) => void;
	toggleCart: (value: boolean) => () => void;
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
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginTop: '24px',
						fontWeight: '600',
					}}>
					<Typography sx={{ fontWeight: '600' }}>Total:</Typography>
					<Typography sx={{ fontWeight: '600' }}>{cartTotalAmount} Rs</Typography>
				</Box>
				<LoaderButton
					text={'Order'}
					loading={loading}
					errorState={errorState}
					handleClick={handleOrder}
					styles={{ marginTop: 2 }}
				/>
			</Box>
		</Container>
	);
};
