import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultItemModel } from 'pages/items-list/item/item.model';

import { ItemDetails } from './item-details.component';

interface RouteState {
	readonly flowId: string;
	readonly item: DefaultItemModel;
}

export const ItemDetailsContainer = () => {
	const navigate = useNavigate();

	const { state } = useLocation();
	const routeState: RouteState = state;

	const [impactOccurred] = useHapticFeedback();

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const item = useMemo(() => routeState.item, [routeState.item]);

	const handleClick = useCallback(() => {
		impactOccurred('light');
		navigate(`checkout`, {
			state: {
				flowId,
				item,
			},
		});
	}, [flowId, impactOccurred, navigate, item]);

	return (
		<>
			<ItemDetails item={item} />
			<MainButton text={'Order'} onClick={handleClick} />
		</>
	);
};
