import { ReactNode } from 'react';

export type CurrencyToChange = 'USDT' | 'RUB';

export interface ExchangeForm {
	amountToChange: number;
	currencyToChange: CurrencyToChange;
}

export interface ToChangeState {
	icon: ReactNode;
}

export interface ToReceiveState {
	icon: ReactNode;
	currency: 'LKR';
	value: number;
}
