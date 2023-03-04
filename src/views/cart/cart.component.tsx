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
import { AmountButtons } from '../../components/amountButtons';

interface CartProps {
	isCartOpened: boolean;
	toggleCart: () => void;
	cartTotalAmount: number;
	cart: ProductModel[] | [];
	// sendWebAppDeepLink: (id: string, domain: string, products: ProductsInCart[]) => void;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

export const Cart: FC<CartProps> = ({
	cart,
	isCartOpened,
	toggleCart,
	cartTotalAmount,
	addToCart,
	removeFromCart,
	// sendWebAppDeepLink,
}) => {
	// const allProducts = cart.map(({ title, amount }) => {
	// 	return { title, amount };
	// });

	// const cartData = {
	// 	products: allProducts,
	// 	// totalPrice: cartTotalAmount,
	// };

	return (
		<Dialog onClose={toggleCart} open={isCartOpened}>
			{cart.length !== 0 ? (
				<>
					<DialogTitle textAlign={'center'}>Shopping cart</DialogTitle>
					<DialogContent dividers>
						<List sx={{ pt: 0 }}>
							{cart.map(product => {
								return (
									<>
										<ListItem disableGutters>
											<Box
												component={'img'}
												src={product.image[0].url}
												alt={product.image[0].alt}
												sx={{ width: '25%', borderRadius: 1, mr: 2 }}
											/>
											<Box
												sx={{
													width: '100%',
												}}>
												<Typography component={'h3'} variant={'h6'} gutterBottom>
													{product.title}
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
														{product.amount}
													</Typography>
													<Typography variant={'body1'}>
														x <strong>{product.price}</strong>
													</Typography>
												</Box>
											</Box>
											<AmountButtons
												product={product}
												addToCart={addToCart}
												amount={product.amount}
												removeFromCart={removeFromCart}
											/>
										</ListItem>
										<Divider />
									</>
								);
							})}
						</List>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginTop: '24px',
							}}>
							<strong>Total: </strong>
							<Typography sx={{ borderBottom: '2px solid #ff335f', fontWeight: '600' }}>
								{cartTotalAmount} Rs
							</Typography>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button
							variant={'contained'}
							fullWidth
							// onClick={() => sendWebAppDeepLink('ZGw6MTM2Nzcz', 'lhelper', allProducts)}
						>
							Buy
						</Button>
					</DialogActions>
				</>
			) : (
				<DialogContent dividers>
					<Typography>Your cart is still empty! Order add something here)</Typography>
				</DialogContent>
			)}
		</Dialog>
	);
};
