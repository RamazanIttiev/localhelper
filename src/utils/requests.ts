import { Telegram } from '../app/App';

interface SendData {
	range: number[];
	scope: unknown;
	variables: { itemName: string; itemPrice: number } | {} | undefined;
}

const sendWebAppMessage = (text: string) => {
	const send = {
		message: text,
		queryId: Telegram.WebApp.initDataUnsafe.query_id,
	};

	return fetch('/sendMessage.php', {
		method: 'POST',
		body: JSON.stringify(send),
	});
};

export const sendWebAppDeepLink = (
	identifier: string,
	domain: string,
	products?: { itemName: string; order: string } | {},
) => {
	const sendData: SendData = {
		range: [],
		scope: {},
		variables: products,
	};

	return fetch('https://' + domain + '.customer.smartsender.eu/api/i/store', {
		headers: {
			'Content-type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
		},
		method: 'POST',
		body: JSON.stringify(sendData),
	})
		.then(res => {
			return res.json();
		})
		.then(store => {
			// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
			return sendWebAppMessage('/start ' + btoa(atob(identifier) + '|' + store.id).replace(/=/g, ''));
		});
};
