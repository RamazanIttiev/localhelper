declare global {
	interface Window {
		Telegram: any;
	}
}

interface SendData {
	range: number[];
	scope: unknown;
	variables: { itemName: string; itemPrice: number } | {} | undefined;
}

const Telegram = window.Telegram;

const sendWebAppMessage = (text: string) => {
	const send = {
		message: text,
		queryId: Telegram.WebApp.initDataUnsafe.query_id,
	};

	fetch('/sendMessage.php', {
		method: 'POST',
		body: JSON.stringify(send),
	})
		.then(res => {
			return res.json();
		})
		.then(data => {
			return data;
		})
		.catch(error => {
			console.log(error);
		});
};

export const sendWebAppDeepLink = (
	identifier: string,
	domain: string,
	products?: { itemName: string; itemPrice: number } | {},
) => {
	const sendData: SendData = {
		range: [],
		scope: {},
		variables: products,
	};
	fetch('https://' + domain + '.customer.smartsender.eu/api/i/store', {
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
			sendWebAppMessage('/start ' + btoa(atob(identifier) + '|' + store.id).replace(/=/g, ''));
		});
};
