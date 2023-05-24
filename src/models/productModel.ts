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
	Restaurants?: string[];
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
	Id: string;
	Flow: string;
	FlowId: string;
	HeaderTitle: string;
	HeaderImage: { url: string }[];
	Products: ProductModel[] | undefined;
	Restaurants: RestaurantModel[] | undefined;
}

export interface RestaurantModel {
	Id: string;
	Title: string;
	Contact: string;
	OpenTime: string;
	Location: string;
	CloseTime: string;
	Category: string[];
	IsWorking: boolean;
	Coordinates: string;
	WorkingTime: string;
	WorkingStatus: string;
	Image: { url: string }[];
	Products: ProductModel[] | undefined;
}

export interface AppData {
	products: ProductModel[];
	restaurants: RestaurantModel[];
	categories: Omit<CategoryModel, 'Restaurants'>[];
}
