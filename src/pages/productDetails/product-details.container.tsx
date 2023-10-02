import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { ProductDetails } from './product-details.component';

interface RouteState {
	readonly flowId: string;
	readonly product: DefaultProductModel;
}

export const ProductDetailsContainer = () => {
	const navigate = useNavigate();

	const { state } = useLocation();
	const routeState: RouteState = state;

	const [impactOccurred] = useHapticFeedback();

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const product = useMemo(() => routeState.product, [routeState.product]);

	const handleClick = useCallback(() => {
		impactOccurred('light');
		navigate(`checkout`, {
			state: {
				flowId,
				product,
			},
		});
	}, [flowId, impactOccurred, navigate, product]);

	return (
		<>
			<ProductDetails product={product} />
			<MainButton text={'Order'} onClick={handleClick} />
		</>
	);
};
