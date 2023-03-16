declare global {
	interface Window {
		Telegram: any;
	}
}

const Telegram = window.Telegram;

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

export const sendWebAppDeepLink = (
	identifier: string,
	domain: string,
	products?: { itemName: string; itemPrice: number } | {},
) => {
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
