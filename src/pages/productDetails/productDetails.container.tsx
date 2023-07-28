import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Container } from '@mui/material';
import { ErrorType } from '../../models/error.model';
import { useLocation, useNavigate } from 'react-router-dom';
import { DishSizeType, FoodExtraOptions, ProductModel } from '../../models/product.model';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage } from '../../actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { isFood } from '../../utils/typeGuard';
import { CART_ACTION } from '../../components/amountButtons';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { LoaderButton } from '../../reactkit/loaderButton';
import { useShoppingCart } from '../../context/cart.context';
import { Actions, initialState, reducer } from '../../utils/reducers';

export const ProductDetailsContainer = () => {
	const { state } = useLocation();
	const price = state?.price;
	const restaurant = state?.restaurant;

	const { pathname } = useLocation();

	const navigate = useNavigate();
	const { addNewProduct } = useShoppingCart();
	const { isRestaurantDetailsRoute } = useReactRouter();

	const [productAmount, setProductAmount] = useState(1);
	const [productExtra, setProductExtra] = useState<FoodExtraOptions | undefined>(
		isFood(state) && state.dishSize ? { dishSize: 'small' } : undefined,
	);
	const product: ProductModel = useMemo(
		() => ({ ...state, amount: productAmount, extraOptions: productExtra }),
		[productAmount, productExtra, state],
	);

	const [{ loading, errorState }, dispatch] = useReducer(reducer, initialState);

	const handleProductAmount = (action: CART_ACTION) => {
		setProductAmount(() => {
			if (action === 'add') {
				return productAmount + 1;
			} else return productAmount - 1;
		});
	};

	const handleExtra = (event: React.SyntheticEvent) => {
		const { value } = event.target as HTMLInputElement;
		const dishSize = value as DishSizeType;

		setProductExtra(prevState => {
			return {
				...prevState,
				dishSize,
			};
		});
	};

	const navigateToCheckout = useCallback(() => {
		navigate(`${pathname}-checkout`, {
			state: {
				product,
			},
		});
	}, [navigate, pathname, product]);

	const addProductToCart = useCallback(() => {
		isFood(product) &&
			addNewProduct({
				id: product.id,
				restaurant: product.restaurant,
				amount: product.amount,
				extraOptions: product.extraOptions,
			});
		navigate(-1);
	}, [addNewProduct, navigate, product]);

	useEffect(() => {
		if (isRestaurantDetailsRoute && isFood(product) && product.dishSize) {
			showMainButton();
			handleMainButton(addProductToCart);
			setMainButtonText('Add to cart');
		} else hideMainButton();

		return () => {
			hideMainButton();
			removeMainButtonEvent(addProductToCart);
		};
	}, [addProductToCart, isRestaurantDetailsRoute, product]);

	useEffect(() => {
		if (!isRestaurantDetailsRoute) {
			showMainButton();
			setMainButtonText(`${price} Rs`);
		} else hideMainButton();

		return () => {
			hideMainButton();
		};
	}, [isRestaurantDetailsRoute, price]);

	useEffect(() => {
		if (errorState.isError !== null) {
			clearResponseMessage(
				errorState,
				(value: ErrorType) => dispatch && dispatch({ type: Actions.SET_ERROR, payload: value }),
			);
		}
	}, [errorState]);

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<ProductDetailsUI
				loading={loading}
				restaurant={restaurant}
				errorState={errorState}
				handleExtra={handleExtra}
				selectedProduct={product}
				productExtra={productExtra}
				navigateToCheckout={navigateToCheckout}
				handleProductAmount={handleProductAmount}
			/>
			{isRestaurantDetailsRoute && !isUserAgentTelegram && isFood(product) && product.dishSize && (
				<LoaderButton isMainButton text={'Add to cart'} handleClick={addProductToCart} />
			)}
		</Container>
	);
};
