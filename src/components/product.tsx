import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useAirtableView, useCategory } from '../hooks/useCategory';

interface ProductProps {
	product: ProductModel;
	// cart: ProductModel[];
	// removeFromCart: (product: ProductModel) => void;
	// addToCart: (selectedProduct: ProductModel) => void;
	handleOpenModal: (currentProduct: ProductModel | null) => void;
}

declare global {
	interface Window {
		Telegram: any;
	}
}

const Telegram = window.Telegram;

export const Product: FC<ProductProps> = ({ product, handleOpenModal }) => {
	const { title, place, price, image } = product;
	const idForBot = useAirtableView(useCategory());
	// const productInCart = isProductInCart(cart, product);

	const sendWebAppMessage = (text: string) => {
		const send = {
			message: text,
			queryId: Telegram.WebApp.initDataUnsafe.query_id,
		};
		const xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function () {
			if (this.readyState === 4) {
				console.log(this.responseText);
			}
		});
		xhr.open('POST', '/sendMessage.php');
		xhr.send(JSON.stringify(send));
	};

	const sendWebAppDeepLink = (
		identifier: string,
		domain: string,
		products: { itemName: string; itemPrice: number },
	) => {
		console.log(products);
		const sendData = {
			range: [],
			scope: {},
			variables: products,
		};
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://' + domain + '.customer.smartsender.eu/api/i/store');
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				const store = JSON.parse(this.responseText);
				// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
				sendWebAppMessage('/start ' + btoa(atob(identifier) + '|' + store.id).replace(/=/g, ''));
			}
		};
		xhr.send(JSON.stringify(sendData));
	};

	return (
		<Card
			sx={{
				height: 'auto',
				pt: 1,
				pb: 1,
				boxShadow:
					'0px 0px 20px -8px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 0px 8px 0px rgb(0 0 0 / 12%)',
			}}>
			<Box onClick={() => handleOpenModal(product)}>
				<CardMedia
					component="img"
					image={image[0].url}
					alt={image[0].alt}
					sx={{ width: '50%', margin: '0 auto', borderRadius: '8px' }}
				/>
				<CardContent sx={{ '&:last-child': { pb: 0, pt: 0.5 } }}>
					<Typography sx={{ mb: 2, textAlign: 'center' }} variant="h5">
						{title}
					</Typography>
					{price && (
						<Typography gutterBottom variant="body2">
							<strong>Price:</strong> Rs {price}
						</Typography>
					)}
					{place && (
						<Typography gutterBottom variant="body2">
							<strong>Place:</strong> {place}
						</Typography>
					)}
				</CardContent>
			</Box>
			<CardActions sx={{ flexDirection: 'column', pb: 0 }}>
				{/*{productInCart ? (*/}
				{/*	<AmountButtons*/}
				{/*		product={product}*/}
				{/*		amount={productInCart.amount}*/}
				{/*		addToCart={addToCart}*/}
				{/*		removeFromCart={removeFromCart}*/}
				{/*	/>*/}
				{/*) : (*/}
				<Button
					sx={{ height: '32px' }}
					variant={'contained'}
					fullWidth
					onClick={() => sendWebAppDeepLink(idForBot, 'lhelper', { itemName: title, itemPrice: price })}>
					Buy
				</Button>
				{/*)}*/}
			</CardActions>
		</Card>
	);
};
