export interface CartOrderData {
	order: string;
	orderTotal: number;
	restaurant?: string;
	coordinates?: string;
}

export interface SingleOrderData {
	itemName: string;

	contactPlace?: string;
	coordinates?: string;
}
