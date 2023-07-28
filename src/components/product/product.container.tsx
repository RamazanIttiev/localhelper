import React, { FC, useCallback, useReducer, useState } from 'react';
import { ProductComponent } from './product.component';
import { ProductModel, RestaurantModel } from '../../models/product.model';
import { isFood } from '../../utils/typeGuard';
import { CART_ACTION } from '../amountButtons';
import { useShoppingCart } from '../../context/cart.context';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialState, reducer } from '../../utils/reducers';
import { useMainButton } from '../../hooks/useMainButton';

interface ProductContainerProps {
	flowId: string;
	currentProduct: ProductModel;
	restaurant: RestaurantModel | undefined;
}

export const ProductContainer: FC<ProductContainerProps> = ({ flowId, currentProduct, restaurant }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { incrementCartAmount, decrementCartAmount } = useShoppingCart();

	const [{ loading, errorState }, dispatch] = useReducer(reducer, initialState);

	const [product, setProduct] = useState<ProductModel>({ ...currentProduct });

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

	const navigateToCheckout = useCallback(() => {
		navigate(`${pathname}-checkout`, {
			state: {
				product,
				flowId,
			},
		});
	}, [navigate, pathname, product, flowId]);

	useMainButton({ handleClick: navigateToCheckout, dispatch, errorState, buttonLabel: 'order' });

	return (
		<ProductComponent
			flowId={flowId}
			product={product}
			loading={loading}
			restaurant={restaurant}
			errorState={errorState}
			navigateToCheckout={navigateToCheckout}
			handleProductAmount={handleProductAmount}
		/>
	);
};
