import React from 'react';
import { CartList } from './cart-list';
import { ErrorType } from '../../models/error';
import { Box, Container, Typography } from '@mui/material';
import { Drawer } from '../../components/drawer/drawer';
import { ProductModel } from '../../models/productModel';
import { DrawerFooter } from '../../components/drawer/drawer-footer';
import { LoaderButton } from '../../components/reactkit/loaderButton';

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
	toggleCart,
	errorState,
	handleOrder,
	isCartOpened,
	cartProducts,
	removeFromCart,
	cartTotalAmount,
}: CartProps) => {
	return (
		<>
			{!isCartOpened && <DrawerFooter toggleDrawer={toggleCart} />}
			<Drawer isOpened={isCartOpened} toggleDrawer={toggleCart} icon={'delete'}>
				<Container maxWidth={'md'}>
					<CartList addToCart={addToCart} removeFromCart={removeFromCart} cartProducts={cartProducts} />
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
				</Container>
			</Drawer>
		</>
	);
};
