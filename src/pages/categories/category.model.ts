import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { Item } from 'ui/organisms/item/domain/item.model.ts';

export interface Category {
	id: string;
	flow: string;
	flowId: string;
	headerTitle: string;
	headerImage: { url: string }[];
	items: Item[] | undefined;
	restaurant: Restaurant[] | undefined;
}
