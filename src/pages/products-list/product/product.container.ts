import { createElement, FC, useCallback, useEffect, useState } from 'react';

import { ErrorType } from 'models/error.model';
import { ProductModel } from 'models/product.model';

import { clearResponseMessage, handleOrder } from 'actions/global-actions';

import { Product } from './product.component';

interface ProductContainerProps {
	flowId: string;
	product: ProductModel;
}

export const ProductContainer: FC<ProductContainerProps> = ({ flowId, product }) => {
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: product.title,
				placeNumber: product?.contact,
				placeCoordinates: product?.coordinates,
			},
			handleLoading,
			handleError,
		);
	}, [flowId, product?.contact, product?.coordinates, product.title]);

	return createElement(Product, {
		flowId,
		product,
		loading,
		errorState,
		handleProductOrder,
	});
};
