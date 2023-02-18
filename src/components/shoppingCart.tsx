import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
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

interface ShoppingCartProps {
	isCartOpened: boolean;
	toggleCart: () => void;
	cart: ProductModel[] | [];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel, amount: number) => void;
}
export const ShoppingCart: FC<ShoppingCartProps> = ({ cart, isCartOpened, toggleCart }) => {
	const cartTotalAmount = (cart as ProductModel[]).reduce((previous, current): number => {
		return previous + current.amount * current.price;
	}, 0);

	// const allProducts = cart.map(({ title, amount }) => {
	// 	return { title, amount };
	// });

	// const requestBody = {
	// 	products: allProducts,
	// 	total: cartTotalAmount,
	// };
	//
	// const sendWebAppMessage = (text: string) => {
	// 	const send = {
	// 		message: text,
	// 		queryId: Telegram.WebApp.initDataUnsafe.query_id,
	// 	};
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.addEventListener('readystatechange', function () {
	// 		if (this.readyState === 4) {
	// 			console.log(this.responseText);
	// 		}
	// 	});
	// 	xhr.open('POST', '/sendMessage.php');
	// 	xhr.send(JSON.stringify(send));
	// };
	//
	// const sendWebAppDeepLink = (identifier: string, domain: string, param = {}) => {
	// 	const sendData = {
	// 		range: [],
	// 		scope: {},
	// 		variables: param,
	// 	};
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.open('POST', 'https://' + domain + '.customer.smartsender.eu/api/i/store');
	// 	xhr.setRequestHeader('Content-type', 'application/json');
	// 	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	// 	xhr.onreadystatechange = function () {
	// 		if (this.readyState === 4 && this.status === 200) {
	// 			const store = JSON.parse(this.responseText);
	// 			sendWebAppMessage(
	// 				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
	// 				'/start ' + btoa(Buffer.from(identifier, 'base64') + '|' + store.id).replace(/=/g, ''),
	// 			);
	// 		}
	// 	};
	// 	xhr.send(JSON.stringify(sendData));
	// };

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
				<Button variant={'contained'} fullWidth>
					Buy
				</Button>
			</DialogActions>
		</Dialog>
	);
};
