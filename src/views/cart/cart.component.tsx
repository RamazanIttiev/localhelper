import React, { FC } from 'react';
import { ProductModel } from '../../models/productModel';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	List,
	ListItem,
	Typography,
} from '@mui/material';

interface CartProps {
	isCartOpened: boolean;
	toggleCart: () => void;
	cartTotalAmount: number;
	cart: ProductModel[] | [];
	sendWebAppDeepLink: () => void;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel, amount: number) => void;
}

export const Cart: FC<CartProps> = ({ cart, isCartOpened, toggleCart, cartTotalAmount, sendWebAppDeepLink }) => {
	return (
		<Dialog onClose={toggleCart} open={isCartOpened}>
			<DialogTitle textAlign={'center'}>Shopping cart</DialogTitle>
			<DialogContent dividers>
				<List sx={{ pt: 0 }}>
					{cart.map(({ title, price, amount, image }) => {
						return (
							<>
								<ListItem disableGutters>
									<Box
										component={'img'}
										src={image[0].url}
										alt={image[0].alt}
										sx={{ width: '25%', borderRadius: 1, mr: 2 }}
									/>
									<Box
										sx={{
											width: '100%',
										}}>
										<Typography component={'h3'} variant={'h6'} gutterBottom>
											{title}
										</Typography>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<Typography
												variant={'body1'}
												sx={{
													background: ' #ff335f',
													borderRadius: '50%',
													width: '24px',
													height: '24px',
													color: ' #fff',
													textAlign: ' center',
													mr: 0.5,
												}}>
												{amount}
											</Typography>
											<Typography variant={'body1'}>
												x <strong>{price}</strong>
											</Typography>
										</Box>
									</Box>
								</ListItem>
								<Divider />
							</>
						);
					})}
				</List>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
					<strong>Total: </strong>
					<Typography sx={{ borderBottom: '2px solid #ff335f', fontWeight: '600' }}>
						{cartTotalAmount} Rs
					</Typography>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant={'contained'} fullWidth onClick={sendWebAppDeepLink}>
					Buy
				</Button>
			</DialogActions>
		</Dialog>
	);
};
