export interface CardModel {
	id: number;
	title: string;
	place: string;
	price: string;
	image: { url: string; fileName: string }[];
	description: string;
}
