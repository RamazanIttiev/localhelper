import { useState, useEffect } from 'react';

import { CurrencyToChange } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model.ts';

export const useCurrencyRate = (currency: CurrencyToChange) => {
	const [rate, setRate] = useState<number | null>(null);

	useEffect(() => {
		// Define your fetch function here (similar to the previous example)
		function fetchCurrencyRate() {
			// Simulate the fetch operation
			setTimeout(() => {
				const exchangeRates = {
					USDT: 325, // Example rates, replace with real data
					RUB: 3.89,
				};

				if (exchangeRates[currency]) {
					setRate(exchangeRates[currency]);
				} else {
					console.log(`Currency ${currency} not found.`);
				}
			}, 1000); // Simulate a 1-second delay
		}

		fetchCurrencyRate();
	}, [currency]);

	return rate;
};
