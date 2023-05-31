import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { ErrorType } from '../../models/error';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { DishSizeType, FoodExtraOptions, FoodModel, ProductModel } from '../../models/productModel';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductDetailsUI } from './productDetails.component';
import { clearResponseMessage, handleOrder } from '../../actions/global-actions';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useRestaurant } from '../../hooks/useRestaurant';
import { isFood } from '../../utils/typeGuard';
import { CART_ACTION } from '../../components/amountButtons';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { LoaderButton } from '../../reactkit/loaderButton';

export const ProductDetailsContainer = () => {
	const { state } = useLocation();

	const navigate = useNavigate();
	const { addToCart } = useCart();
	const { flowId } = useCategory();
	const { isRestaurantDetailsRoute } = useReactRouter();
	const { restaurant } = useRestaurant();

	const [productAmount, setProductAmount] = useState(1);
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		isError: null,
	});
	const [productExtra, setProductExtra] = useState<FoodExtraOptions | undefined>(
		isFood(state) && state.DishSize ? { dishSize: 'small' } : undefined,
	);
	const product: ProductModel = useMemo(
		() => ({ ...state, amount: productAmount, extra: productExtra }),
		[productAmount, productExtra, state],
	);

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
	}, [flowId, product.Contact, product.coordinates, product.title]);

	const addProductToCart = useCallback(() => {
		addToCart(product as FoodModel);
		navigate(-1);
	}, [addToCart, navigate, product]);

	useEffect(() => {
		if (isRestaurantDetailsRoute && isFood(product) && product.DishSize) {
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
			handleMainButton(handleProductOrder);
			setMainButtonText(`${state?.price} Rs`);
		} else hideMainButton();

		return () => {
			hideMainButton();
			removeMainButtonEvent(handleProductOrder);
		};
	}, [handleProductOrder, isRestaurantDetailsRoute, state?.price]);

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const handleLoading = (value: boolean) => setLoading(value);

	const handleError = (value: ErrorType) => setErrorState(value);

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<ProductDetailsUI
				loading={loading}
				errorState={errorState}
				handleExtra={handleExtra}
				selectedProduct={product}
				productExtra={productExtra}
				handleProductOrder={handleProductOrder}
				handleProductAmount={handleProductAmount}
				isRestaurantWorking={restaurant?.IsWorking}
				amountButtonsVisible={isRestaurantDetailsRoute}
			/>
			{isRestaurantDetailsRoute && !isUserAgentTelegram && isFood(product) && product.DishSize && (
				<LoaderButton isMainButton text={'Add to cart'} handleClick={addProductToCart} />
			)}
		</Container>
	);
};
