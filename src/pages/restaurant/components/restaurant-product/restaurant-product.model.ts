export interface RestaurantProductModel {
	id: string;
	title: string;
	price: number;
	image: { url: string; thumbnails: { small: { url: string } } }[];
	amount: number;
	description?: string;
	infoBadges?: string[];
}
