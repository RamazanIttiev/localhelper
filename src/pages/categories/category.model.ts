import { Product } from 'pages/products-list/product/product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

export interface Category {
	id: string;
	flow: string;
	flowId: string;
	headerTitle: string;
	headerImage: { url: string }[];
	products: Product[] | undefined;
	restaurant: Restaurant[] | undefined;
}
