export interface RestaurantProductModel {
	id: string;
	title: string;
	price: number;
	image: string;
	amount: number;
	description?: string;
	infoBadges?: string[];
}
