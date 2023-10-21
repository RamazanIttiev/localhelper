export interface RestaurantItem {
	id: string;
	title: string;
	price: number;
	amount: number;
	image: { url: string }[];
	spicy?: number;
	location?: string;
	vegetarian?: string;
	description?: string;
	restaurant?: string[];
	iconBadges?: { url: string }[];
}
