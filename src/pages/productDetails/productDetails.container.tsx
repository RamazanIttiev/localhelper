import React, { useCallback, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import { ErrorType } from '../../models/error.model';
import { useLocation } from 'react-router-dom';
import { ProductDetailsUI } from './productDetails.component';
import { handleOrder } from '../../actions/global-actions';

export const ProductDetailsContainer = () => {
	const { state } = useLocation();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});
	const product: any = useMemo(() => ({ state }), [state]);

	const flowId = state.flowId;

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
	}, [flowId, product.contact, product.coordinates, product.title]);

	const handleLoading = (value: boolean) => setLoading(value);

	const handleError = (value: ErrorType) => setErrorState(value);

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<ProductDetailsUI
				loading={loading}
				errorState={errorState}
				selectedProduct={product}
				handleProductOrder={handleProductOrder}
			/>
		</Container>
	);
};
