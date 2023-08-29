import { RestaurantProductModel } from '../pages/restaurant/restaurant-product/restaurant-product.model';

export interface DefaultProductModel {
	id: string;
	title: string;
	place: string;
	price: number;
	contact?: string;
	description: string;
	category?: string[];
	coordinates?: string;
	infoBadges?: string[];
	image: { url: string; thumbnails: { small: { url: string } } }[];
}

export type DishSizeType = 'small' | 'large';

export interface FoodExtraOptions {
	dishSize: DishSizeType;
}

export interface FoodModel extends DefaultProductModel {
	spicy?: number;
	amount: number;
	location?: string;
	vegetarian?: string;
	dishSize?: string[];
	restaurant: string[];
	extraOptions?: FoodExtraOptions;
}

export interface RentModel extends DefaultProductModel {
	tv?: boolean;
	ac?: boolean;
	wifi?: boolean;
	pool?: boolean;
	breakfast?: boolean;
}

export type ProductModel = FoodModel | RentModel | RestaurantProductModel;

export interface CategoryModel {
	id: string;
	flow: string;
	flowId: string;
	headerTitle: string;
	headerImage: { url: string; thumbnails: { small: { url: string } } }[];
	products: ProductModel[] | undefined;
	restaurant: RestaurantModel[] | undefined;
}

export interface RestaurantModel {
	id: string;
	title: string;
	contact: string;
	openTime: string;
	location: string;
	closeTime: string;
	category: string[];
	isWorking: boolean;
	coordinates: string;
	workingTime: string;
	workingStatus: string;
	image: { url: string; thumbnails: { small: { url: string } } }[];
	products: RestaurantProductModel[] | undefined;
}

export interface AppData {
	products: ProductModel[];
	restaurants: RestaurantModel[];
	currentData: Omit<CategoryModel, 'restaurant'> | RestaurantModel;
}
