export interface RestaurantItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	image: { url: string }[];
	spicy?: number;
	location?: string;
	vegetarian?: string;
	description?: string;
	restaurant?: string[];
	iconBadges?: { url: string }[];
}
