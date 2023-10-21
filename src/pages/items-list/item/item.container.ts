import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { createElement, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ItemComponent } from 'pages/items-list/item/item.component';
import { Item } from 'pages/items-list/item/item.model';

interface Props {
	flowId: string;
	item: Item;
}

export const ItemContainer = ({ flowId, item }: Props) => {
	const navigate = useNavigate();
	const [impactOccurred] = useHapticFeedback();

	const handleClick = useCallback(() => {
		impactOccurred('light');
		navigate(`${item.title}/checkout`, {
			state: {
				flowId,
				item,
			},
		});
	}, [flowId, impactOccurred, navigate, item]);

	return createElement(ItemComponent, {
		flowId,
		item,
		handleClick,
	});
};
