export type Cart = CartItem[];

export interface CartItem {
	readonly id: string;
	readonly quantity: number;
	readonly restaurantTitle: string;
}
