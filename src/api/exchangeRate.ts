import { CurrencyToChange } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

export const getExchangeRate = async (currency: CurrencyToChange): Promise<number | null> => {
	return await new Promise((resolve, reject) => {
		setTimeout(() => {
			const exchangeRates = {
				USDT: 323.45,
				RUB: 3.24,
			};

			if (exchangeRates[currency]) {
				resolve(exchangeRates[currency]);
			} else {
				reject(`Currency ${currency} not found.`);
			}
		}, 1000);
	});
};
