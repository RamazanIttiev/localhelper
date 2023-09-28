import { TgWebApp } from 'app/App';

import { apiRequest } from 'api/api';

interface SendData {
	range: number[];
	scope: unknown;
	variables: unknown | undefined;
}

const sendWebAppMessage = async (text: string) => {
	const url = process.env.REACT_APP_SERVER_URL || '';
	const headers = {};
	const body = {
		message: text,
		queryId: TgWebApp.initDataUnsafe.query_id,
	};

	return await apiRequest(url, 'POST', headers, body);
};

export const sendWebAppDeepLink = async (identifier: string, order: unknown | undefined) => {
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
