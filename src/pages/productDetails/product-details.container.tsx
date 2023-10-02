import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DefaultProductModel } from 'pages/products-list/product/product.model';

import { setHaptic } from 'actions/webApp-actions';

import { ProductDetails } from './product-details.component';

interface RouteState {
	readonly flowId: string;
	readonly product: DefaultProductModel;
}

export const ProductDetailsContainer = () => {
	const navigate = useNavigate();

	const { state } = useLocation();
	const routeState: RouteState = state;

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const product = useMemo(() => routeState.product, [routeState.product]);

	const handleClick = useCallback(() => {
		setHaptic('soft');
		navigate(`checkout`, {
			state: {
				flowId,
				product,
			},
		});
	}, [flowId, navigate, product]);

	return (
		<>
			<ProductDetails product={product} />
			<MainButton text={'Order'} onClick={handleClick} />
		</>
	);
};
