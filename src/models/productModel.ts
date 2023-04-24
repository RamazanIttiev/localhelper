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
	position?: string;
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
	breakfast?: boolean;
}

export type ProductModel = DefaultProductModel & FoodModel & RentModel;

export interface CategoryModel {
	Flow: string;
	FlowId: string;
	Id: string;
	HeaderImage: string;
	HeaderTitle: string;
}

export interface AppData {
	resolvedCategories: CategoryModel[] | null;
	resolvedProducts: ProductModel[] | null;
}
