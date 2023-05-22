import { Telegram } from '../app/App';

interface SendData {
	range: number[];
	scope: unknown;
	variables: { order: string; itemName?: undefined } | { itemName: string; order?: undefined } | undefined;
}

const sendWebAppMessage = (text: string) => {
	const send = {
		message: text,
		queryId: Telegram.initDataUnsafe.query_id,
	};

	// const url =
	// 	window.location.origin === 'https://menu.localhelper.ru'
	// 		? 'https://menu.localhelper.ru/sendMessage.php'
	// 		: 'https://test.localhelper.ru/sendMessage.php';
	return fetch('https://setuplocalhelper.store/sendMessage.php', {
		method: 'POST',
		body: JSON.stringify(send),
	});
};

export const sendWebAppDeepLink = (
	identifier: string,
	domain: string,
	order: { order: string; itemName?: undefined } | { itemName: string; order?: undefined } | undefined,
) => {
	const sendData: SendData = {
		range: [],
		scope: {},
		variables: order,
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
