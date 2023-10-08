import { ReactNode } from 'react';

export type CurrencyToChange = 'USD' | 'RUB';

export interface ExchangeForm {
	amountToChange: number;
	currencyToChange: CurrencyToChange;
}

export interface ToChangeState {
	icon: ReactNode;
}

export interface ToReceiveState {
	icon: ReactNode;
	currency: 'LK';
	value: number;
}
