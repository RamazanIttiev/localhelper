import { useEffect, useState } from 'react';

import { CurrencyToChange } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

import { getExchangeRate } from 'api/exchangeRate';

export const useRateFetcher = (currency: CurrencyToChange) => {
	const [rate, setRate] = useState<number>(0);

	useEffect(() => {
		const fetchRate = async () => {
			try {
				const rate = await getExchangeRate(currency);

				if (typeof rate === 'number') {
					setRate(rate);
				}
			} catch {
				setRate(0);
			}
		};

		fetchRate();
	}, [currency]);

	return rate;
};
