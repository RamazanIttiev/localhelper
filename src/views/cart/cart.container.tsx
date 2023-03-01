import React, { FC } from 'react';
import { Cart } from './cart.component';
import { ProductModel } from '../../models/productModel';

interface CartContainerProps {
	isCartOpened: boolean;
	toggleCart: () => void;
	cart: ProductModel[] | [];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (product: ProductModel) => void;
}

declare global {
	interface Window {
		Telegram: any;
	}
}

const Telegram = window.Telegram;

export const CartContainer: FC<CartContainerProps> = ({
	cart,
	isCartOpened,
	toggleCart,
	addToCart,
	removeFromCart,
}) => {
	const cartTotalAmount = (cart as ProductModel[]).reduce((previous, current): number => {
		return previous + current.amount * current.price;
	}, 0);

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

	const sendWebAppDeepLink = (id: string, domain: string, param: { itemeName: string; itemePrice: string }) => {
		const sendData = {
			range: [],
			scope: {},
			variables: param,
		};
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://' + domain + '.customer.smartsender.eu/api/i/store');
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				const store = JSON.parse(this.responseText);
				sendWebAppMessage(
					// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
					'/start ' + btoa(Buffer.from(id, 'base64') + '|' + store.id).replace(/=/g, ''),
				);
			}
		};
		xhr.send(JSON.stringify(sendData));
	};

	return (
		<Cart
			cart={cart}
			addToCart={addToCart}
			toggleCart={toggleCart}
			isCartOpened={isCartOpened}
			removeFromCart={removeFromCart}
			cartTotalAmount={cartTotalAmount}
			sendWebAppDeepLink={sendWebAppDeepLink}
		/>
	);
};
