export interface RestaurantProductModel {
	id: string;
	title: string;
	price: number;
	image: { url: string }[];
	amount: number;
	description?: string;
	infoBadges?: string[];
}
