import { ReactNode } from 'react';

export interface ExchangeFormFields {
	userName: string;
	userPhone?: string;
	amountToChange: number;
	amountToReceive: number;
	currencyToChange: 'USDT' | 'LKR';
}

export interface ExchangeState {
	icon: ReactNode;
	fieldName: string;
	requiredMessage: string;
	patternMessage: string;
	pattern: RegExp;
	currency: string;
	required: boolean;
}
