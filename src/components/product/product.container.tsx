import React, { FC, useCallback, useEffect, useState } from 'react';
import { ErrorType } from '../../models/error.model';
import { ProductComponent } from './product.component';
import { ProductModel, RestaurantModel } from '../../models/product.model';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import { isFood } from '../../utils/typeGuard';
import { CART_ACTION } from '../amountButtons';
import { useShoppingCart } from '../../context/cart.context';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductContainerProps {
	flowId: string;
	currentProduct: ProductModel;
	restaurant: RestaurantModel | undefined;
}

export const ProductContainer: FC<ProductContainerProps> = ({ flowId, currentProduct, restaurant }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { state } = useLocation();
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

	const navigateToCheckout = useCallback(() => {
		navigate(`${pathname}-checkout`, {
			state: {
				product,
			},
		});
	}, [navigate, pathname, product]);

	return (
		<ProductComponent
			flowId={flowId}
			product={product}
			loading={loading}
			restaurant={restaurant}
			errorState={errorState}
			navigateToCheckout={navigateToCheckout}
			handleProductOrder={handleProductOrder}
			handleProductAmount={handleProductAmount}
		/>
	);
};
