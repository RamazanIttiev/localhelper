import React, { FC, useCallback, useEffect, useState } from 'react';
import { ErrorType } from '../../models/error.model';
import { ProductComponent } from './product.component';
import { ProductModel } from '../../models/product.model';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { isFood } from '../../utils/typeGuard';
import { CART_ACTION } from '../amountButtons';
import { useShoppingCart } from '../../context/cart.context';
import { useCategory } from '../../hooks/useCategory';

interface ProductContainerProps {
	currentProduct: ProductModel;
}

export const ProductContainer: FC<ProductContainerProps> = ({ currentProduct }) => {
	const { flowId } = useCategory();
	const { incrementCartAmount, decrementCartAmount } = useShoppingCart();

	const [product, setProduct] = useState<ProductModel>({ ...currentProduct });
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleProductAmount = (action: CART_ACTION) => {
		setProduct(prevProduct => {
			if (isFood(prevProduct)) {
				action === 'add'
					? incrementCartAmount(prevProduct.id, prevProduct.restaurant)
					: decrementCartAmount(prevProduct.id);
			}
			return prevProduct;
		});
	};

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
	}, [flowId, product?.title, product?.coordinates, product?.contact]);

	return (
		<ProductComponent
			product={product}
			loading={loading}
			errorState={errorState}
			handleProductOrder={handleProductOrder}
			handleProductAmount={handleProductAmount}
		/>
	);
};
