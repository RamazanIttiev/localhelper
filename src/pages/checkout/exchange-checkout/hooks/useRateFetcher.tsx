import { useEffect, useState } from 'react';

import { CurrencyToChange } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

import { apiRequest } from 'api/api';

export const useCurrencyRate = (currency: CurrencyToChange) => {
	const [rate, setRate] = useState<number | null>(null);

	useEffect(() => {
		// Define your fetch function here (similar to the previous example)
		async function fetchCurrencyRate() {
			// Simulate the fetch operation
			const exchangeRates = await apiRequest(
				`https://api.coinbase.com/v2/exchange-rates?currency=${currency}`,
				'GET',
				{},
			);
			console.log(exchangeRates.data.rates['RUB']);
			if (exchangeRates.data.rates[currency]) {
				setRate(exchangeRates[currency]);
			} else {
				console.log(`Currency ${currency} not found.`);
			}
		}

		fetchCurrencyRate();
	}, [currency]);

	return rate;
};
