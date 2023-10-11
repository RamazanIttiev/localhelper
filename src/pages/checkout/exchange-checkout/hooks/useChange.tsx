import React, { useEffect, useState } from 'react';

import { CurrencyToChange, ToChangeState } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

import { ReactComponent as RubleIcon } from 'assets/svg/ruble.svg';
import { ReactComponent as USDIcon } from 'assets/svg/usd.svg';

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
