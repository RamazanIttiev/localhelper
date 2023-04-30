export interface CartOrderData {
	order: string;
	orderTotal: number;
	coordinates?: string;
}

export interface SingleOrderData {
	itemName: string;

	contactPlace?: string;
	coordinates?: string;
}
