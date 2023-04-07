export interface ProductModel {
	id: number;
	title: string;
	place: string;
	price: number;
	tableName?: string;
	description: string;
	image: { url: string; alt: string }[];

	// food props
	spicy?: number;
	amount?: number;
	location?: string;
	vegetarian?: string;

	// hotel props

	tv?: boolean;
	ac?: boolean;
	wifi?: boolean;
	pool?: boolean;
	breakfast?: boolean;
}
