import React, { FC, useCallback, useEffect, useState } from 'react';
import { ProductComponent } from './product.component';
import { useProducts } from '../../hooks/useProducts';
import { ErrorType } from '../../models/error';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { ProductModel } from '../../models/productModel';

interface ProductContainerProps {
	flowId: string;
	product: ProductModel;
	cartProducts: ProductModel[];
	amountButtonsVisible?: boolean;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const ProductContainer: FC<ProductContainerProps> = ({
	flowId,
	product,
	addToCart,
	cartProducts,
	removeFromCart,
	amountButtonsVisible,
}) => {
	const { getProductFromCart } = useProducts();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const productFromCart = getProductFromCart(cartProducts, product);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const handleProductOrder = useCallback(() => {
		return handleOrder(
			flowId,
			{
				itemName: product.title,
				placeNumber: product?.Contact,
				placeCoordinates: product?.coordinates,
			},
			handleLoading,
			handleError,
		);
	}, [flowId, product.title, product.coordinates, product.Contact]);

	return (
		<ProductComponent
			product={product}
			loading={loading}
			addToCart={addToCart}
			errorState={errorState}
			removeFromCart={removeFromCart}
			productFromCart={productFromCart}
			handleProductOrder={handleProductOrder}
			amountButtonsVisible={amountButtonsVisible}
		/>
	);
};
