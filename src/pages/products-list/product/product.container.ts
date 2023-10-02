import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { createElement, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductComponent } from 'pages/products-list/product/product.component';
import { Product } from 'pages/products-list/product/product.model';

interface Props {
	flowId: string;
	product: Product;
}

export const ProductContainer = ({ flowId, product }: Props) => {
	const navigate = useNavigate();
	const [impactOccurred] = useHapticFeedback();

	const handleClick = useCallback(() => {
		impactOccurred('light');
		navigate(`${product.title}/checkout`, {
			state: {
				flowId,
				product,
			},
		});
	}, [flowId, impactOccurred, navigate, product]);

	return createElement(ProductComponent, {
		flowId,
		product,
		handleClick,
	});
};
