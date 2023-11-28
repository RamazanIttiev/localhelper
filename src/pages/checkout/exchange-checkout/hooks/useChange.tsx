import RubleIcon from 'assets/svg/ruble.svg?react';
import USDIcon from 'assets/svg/usd.svg?react';
import { useState, useEffect } from 'react';

import { CurrencyToChange, ToChangeState } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model.ts';

export const useChange = (currencyToChange: CurrencyToChange) => {
	const [toChangeState, setToChangeState] = useState<ToChangeState>({ icon: <USDIcon /> });

	useEffect(() => {
		const getToChangeIcon = () => {
			switch (currencyToChange) {
				case 'USDT': {
					return <USDIcon />;
				}
				case 'RUB': {
					return <RubleIcon />;
				}
				default: {
					return <USDIcon />;
				}
			}
		};

		setToChangeState(prevState => {
			return {
				...prevState,
				icon: getToChangeIcon(),
			};
		});
	}, [currencyToChange]);

	return toChangeState;
};
