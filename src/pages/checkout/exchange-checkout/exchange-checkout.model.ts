import { ReactNode } from 'react';

export interface ExchangeCheckoutModel {
	userName: string;
	userPhone?: string;
	amountToChange: number;
	amountToReceive: number;
	currency: 'USDT' | 'LK';
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
