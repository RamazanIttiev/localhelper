import RupeeIcon from 'assets/svg/rupee.svg?react';
import { useState, useEffect } from 'react';

import { computeAmount } from 'common/utils/service.ts';

import { ToReceiveState } from '../model/exchange-checkout.model.ts';

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
