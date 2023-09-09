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

	const handleClick = useCallback(() => {
		navigate(`${product.title}/checkout`, {
			state: {
				flowId,
				product,
			},
		});
	}, [flowId, navigate, product]);

	return createElement(ProductComponent, {
		flowId,
		product,
		handleClick,
	});
};
