export interface CartOrderData {
	order: string;
	orderTotal: number;
	placeTitle?: string;
	placeLocation?: string;
	placeCoordinates?: string;
}

export interface SingleOrderData {
	itemName: string;
	placeNumber?: string;
	placeLocation?: string;
	placeCoordinates?: string;
}
