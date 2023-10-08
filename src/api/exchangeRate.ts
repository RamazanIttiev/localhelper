import { CurrencyToChange } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

import { apiRequest } from 'api/api';

export const getExchangeRate = async (currency: CurrencyToChange): Promise<number | Error> => {
	try {
		const result = await apiRequest(`https://random-data-api.com/api/v2/users`, 'GET', {});
		return result.id;
	} catch {
		return new Error();
	}
};
