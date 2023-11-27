import { Item } from 'ui/organisms/item/domain/item.model';

export interface Category {
	id: string;
	flow: string;
	flowId: string;
	headerTitle: string;
	headerImage: { url: string }[];
	items: Item[] | undefined;
}
