import { Item } from 'pages/item/domain/item.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

export interface Category {
	id: string;
	flow: string;
	flowId: string;
	headerTitle: string;
	headerImage: { url: string }[];
	items: Item[] | undefined;
	restaurant: Restaurant[] | undefined;
}
