export interface DefaultProductModel {
	id: number;
	title: string;
	place: string;
	price: number;
	tableName?: string;
	description: string;
	image: { url: string; alt: string }[];
	infoBadges?: string[];
	Category?: string[];
	Restaurants?: string[];
}

export interface FoodModel extends DefaultProductModel {
	spicy?: number;
	amount?: number;
	location?: string;
	vegetarian?: string;
}

export interface RentModel extends DefaultProductModel {
	tv?: boolean;
	ac?: boolean;
	wifi?: boolean;
	pool?: boolean;
	coordinates?: string;
	breakfast?: boolean;
	Contact?: string;
}

interface TransportModel {
	coordinates?: string;
	Contact?: string;
}

export type ProductModel = DefaultProductModel & FoodModel & RentModel & TransportModel;

export interface CategoryModel {
	Flow: string;
	FlowId: string;
	Id: string;
	HeaderImage: { url: string }[];
	HeaderTitle: string;
	Products: ProductModel[] | undefined;
	Restaurants: RestaurantModel[] | undefined;
}

export interface RestaurantModel {
	Id: string;
	Title: string;
	Image: { url: string }[];
	Category: string[];
	Products: ProductModel[] | undefined;
	OpenTime: string;
	CloseTime: string;
	Location: string;
	Contact: string;
	Coordinates: string;
}

export interface AppData {
	resolvedCategories: CategoryModel[];
	resolvedProducts: ProductModel[];
}
