import React, { useEffect, useState } from 'react';

import { ToReceiveState } from 'pages/checkout/exchange-checkout/model/exchange-checkout.model';

import { computeAmount } from 'utils/service';

import { ReactComponent as RupeeIcon } from 'assets/svg/rupee.svg';

export const useReceive = (exchangeRate: number | Error | null, amountToChange: number) => {
	const [toReceiveState, setToReceiveState] = useState<ToReceiveState>({
		icon: <RupeeIcon />,
		currency: 'LKR',
		value: 0,
	});

	useEffect(() => {
		const resolveAmount = async () => {
			if (typeof exchangeRate === 'number') {
				setToReceiveState(prevState => {
					return {
						...prevState,
						value: computeAmount(exchangeRate, amountToChange) || 0,
					};
				});
			}
		};

		resolveAmount();
	}, [amountToChange, exchangeRate]);

	return toReceiveState;
};
