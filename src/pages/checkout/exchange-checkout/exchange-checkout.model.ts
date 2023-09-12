export interface ExchangeCheckoutModel {
	userName: string;
	userPhone?: string;
	exchangeAmount: number;
	exchangeCurrency: 'USDT' | 'INR';
}
