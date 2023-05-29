import React, { FC, useCallback, useEffect, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { ErrorType } from '../../models/error';
import { useProducts } from '../../hooks/useProducts';
import { ProductComponent } from './product.component';
import { ProductModel } from '../../models/productModel';
import { useRestaurant } from '../../hooks/useRestaurant';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { isFood } from '../../utils/typeGuard';
import { CART_ACTION } from '../amountButtons';

interface ProductContainerProps {
	flowId: string;
	currentProduct: ProductModel;
	amountButtonsVisible?: boolean;
}

export const ProductContainer: FC<ProductContainerProps> = ({ flowId, currentProduct, amountButtonsVisible }) => {
	const { getProductFromCart } = useProducts();
	const { restaurant } = useRestaurant();
	const { cartProducts, addToCart, removeFromCart } = useCart();

	const [product, setProduct] = useState<ProductModel>({ ...currentProduct });
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});

	const handleProductAmount = (action: CART_ACTION) => {
		setProduct(prevProduct => {
			if (isFood(prevProduct)) {
				action === 'add' ? addToCart(prevProduct) : removeFromCart(prevProduct);
			}
			return prevProduct;
		});
	};

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const productFromCart = isFood(product) ? getProductFromCart(cartProducts, product) : undefined;

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
			handleProductAmount={handleProductAmount}
			amountButtonsVisible={amountButtonsVisible}
			isRestaurantWorking={restaurant?.IsWorking}
		/>
	);
};
