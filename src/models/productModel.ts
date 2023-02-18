export interface ProductModel {
	id: number;
	title: string;
	place: string;
	price: number;
	image: { url: string; alt: string }[];
	description: string;
	amount: number;
}
