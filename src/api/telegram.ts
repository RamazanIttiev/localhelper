import { Telegram } from '../app/App';
import { apiRequest } from './api';

interface SendData {
	range: number[];
	scope: unknown;
	variables: { order: string; itemName?: undefined } | { itemName: string; order?: undefined } | undefined;
}

const sendWebAppMessage = async (text: string) => {
	const url = process.env.REACT_APP_PROD_SERVER_URL || '';
	const headers = {};
	const body = {
		message: text,
		queryId: Telegram.initDataUnsafe.query_id,
	};

	return await apiRequest(url, 'POST', headers, body);
};

export const sendWebAppDeepLink = async (
	identifier: string,
	order: { order: string; itemName?: undefined } | { itemName: string; order?: undefined } | undefined,
) => {
	const url = process.env.REACT_APP_SMARTSENDER_URL || '';
	const headers = {
		'Content-type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
	};

	const body: SendData = {
		range: [],
		scope: {},
		variables: order,
	};

	return await apiRequest(url, 'POST', headers, body).then(store => {
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		const encodedIdentifier = btoa(atob(identifier) + '|' + store.id).replace(/=/g, '');
		return sendWebAppMessage('/start ' + encodedIdentifier);
	});
};