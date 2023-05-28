import React, { FC, useCallback, useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { ErrorType } from '../../models/error';
import { useProducts } from '../../hooks/useProducts';
import { ProductComponent } from './product.component';
import { ProductModel } from '../../models/productModel';
import { useRestaurant } from '../../hooks/useRestaurant';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';

interface ProductContainerProps {
	flowId: string;
	product: ProductModel;
	amountButtonsVisible?: boolean;
}

export const ProductContainer: FC<ProductContainerProps> = ({ flowId, product, amountButtonsVisible }) => {
	const { getProductFromCart } = useProducts();
	const { cartProducts } = useCart();
	const { restaurant } = useRestaurant();

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const productFromCart = getProductFromCart(cartProducts, product);

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
	}, [flowId, product?.title, product?.coordinates, product?.Contact]);

	return (
		<ProductComponent
			product={product}
			loading={loading}
			errorState={errorState}
			productFromCart={productFromCart}
			handleProductOrder={handleProductOrder}
			amountButtonsVisible={amountButtonsVisible}
			isRestaurantWorking={restaurant?.IsWorking}
		/>
	);
};
