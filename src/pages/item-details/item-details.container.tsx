import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ItemDetails } from './item-details.component.tsx';
import { DefaultItemModel } from 'ui/organisms/item/domain/item.model.ts';

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
