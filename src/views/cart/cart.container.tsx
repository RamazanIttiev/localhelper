import * as React from 'react';
import { useEffect, useState } from 'react';
import { Global } from '@emotion/react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { ErrorType } from '../../models/error';
import { ProductModel } from '../../models/productModel';
import { getFoodCartString } from '../../utils/cart';
import { handleOrder } from '../../actions/global-actions';
import { Cart } from './cart.component';
import { Button, Icon, IconButton, Typography, useTheme } from '@mui/material';

const drawerBleeding = 72;

interface CartContainerProps {
	botIdForCart: string;
	cartProducts: ProductModel[] | [];
	clearState: () => void;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const CartContainer = ({
	cartProducts,
	addToCart,
	removeFromCart,
	botIdForCart,
	clearState,
}: CartContainerProps) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		if (errorState.isError !== null) {
			setTimeout(() => {
				setErrorState({
					message: '',
					isError: null,
				});
			}, 5000);
		}
	}, [errorState]);

	const handleEmptyCart = () => {
		clearState();
		localStorage.removeItem('products');
		setOpen(false);
	};

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const cartTotalAmount = (cartProducts as ProductModel[]).reduce((previous, current): number => {
		return previous + current.amount! * current.price;
	}, 0);

	const orderItems = cartProducts.map(({ title, amount, price }, id) => {
		return `${id + 1}. ${title} ${amount} x ${price}`;
	});

	const cartOrder = getFoodCartString(orderItems, cartTotalAmount);

	const handleCartOrder = () => handleOrder(botIdForCart, cartOrder, handleLoading, handleError);

	const toggleCart = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	return (
		<Box sx={{ height: '100%', backgroundColor: theme.palette.background.paper }}>
			<Global
				styles={{
					'.MuiDrawer-root > .MuiPaper-root': {
						height: `calc(95% - ${drawerBleeding}px)`,
						overflow: 'visible',
					},
				}}
			/>
			{!open && (
				<Box
					sx={{
						position: 'fixed',
						bottom: 0,
						height: '72px',
						zIndex: 9999,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'end',
						flexDirection: 'column',
						paddingBottom: '8px',
						borderTopLeftRadius: '1rem',
						borderTopRightRadius: '1rem',
						backgroundColor: theme.palette.background.paper,
					}}>
					<Box
						sx={{
							width: 30,
							height: 6,
							backgroundColor: '#fff',
							borderRadius: 3,
							position: 'absolute',
							top: 8,
							left: 'calc(50% - 15px)',
						}}
					/>
					<Button onClick={toggleCart(true)} variant={'contained'} sx={{ m: '24px auto 0', width: '60%' }}>
						Your order
					</Button>
				</Box>
			)}

			<SwipeableDrawer
				anchor="bottom"
				open={open}
				keepMounted={false}
				onClose={toggleCart(false)}
				onOpen={toggleCart(true)}
				swipeAreaWidth={drawerBleeding}
				disableSwipeToOpen={false}
				ModalProps={{
					keepMounted: true,
				}}>
				<Box
					sx={{
						position: 'absolute',
						top: -drawerBleeding,
						borderTopLeftRadius: 8,
						borderTopRightRadius: 8,
						visibility: 'visible',
						right: 0,
						left: 0,
						backgroundColor: theme.palette.background.paper,
					}}>
					<Box
						sx={{
							width: 30,
							height: 6,
							backgroundColor: '#fff',
							borderRadius: 3,
							position: 'absolute',
							top: 8,
							left: 'calc(50% - 15px)',
						}}
					/>
					{open && (
						<>
							<Typography sx={{ p: 3, color: '#fff', textAlign: 'center' }}>Your order</Typography>
							<IconButton
								sx={{ position: 'absolute', right: 8, top: 16, color: '#fff' }}
								onClick={handleEmptyCart}>
								<Icon>delete</Icon>
							</IconButton>
						</>
					)}
				</Box>
				<Box
					sx={{
						px: 2,
						pb: 2,
						height: '100%',
						overflow: 'auto',
					}}>
					<Cart
						loading={loading}
						addToCart={addToCart}
						errorState={errorState}
						cartProducts={cartProducts}
						handleOrder={handleCartOrder}
						removeFromCart={removeFromCart}
						cartTotalAmount={cartTotalAmount}
					/>
				</Box>
			</SwipeableDrawer>
		</Box>
	);
};
