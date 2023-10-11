export interface CheckoutModel {
	userName: string;
	userPhone: string;
}

export interface BikesCheckoutModel extends CheckoutModel {
	startDate: Date | null;
	endDate: Date | null;
}
