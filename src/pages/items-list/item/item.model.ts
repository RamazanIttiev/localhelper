export interface DefaultItemModel {
	id: string;
	title: string;
	place: string;
	price: number;
	description: string;
	image: { url: string }[];
	contact?: string;
	category?: string[];
	coordinates?: string;
	iconBadges?: { url: string }[];
}

export interface RentModel extends DefaultItemModel {
	tv?: boolean;
	ac?: boolean;
	wifi?: boolean;
	pool?: boolean;
	breakfast?: boolean;
}

export type Item = DefaultItemModel | RentModel;
