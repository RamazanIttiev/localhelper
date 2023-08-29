import { createElement, useCallback, useEffect } from 'react';
import { Cart } from './cart.component';
import {
	handleMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../../context/cart.context';
import { RestaurantModel } from '../../models/product.model';
import { RestaurantProductModel } from '../restaurant/restaurant-product/restaurant-product.model';
import { getMappedCartList } from '../../utils/cart';

interface RouteState {
	state: {
		flowId: string;
		products: RestaurantProductModel[];
		restaurant: RestaurantModel;
	};
}

export const CartContainer = () => {
	const { state }: RouteState = useLocation();
	const navigate = useNavigate();

	const products = state.products;
	const restaurant = state.restaurant;

	const { isCartEmpty, cartItems } = useShoppingCart();

	const cartList = getMappedCartList(products, cartItems);

	const navigateToCheckout = useCallback(() => {
		navigate('/checkout', {
			state: {
				...state,
			},
		});
	}, [navigate, state]);

	useEffect(() => {
		showMainButton();
		setMainButtonText('Checkout');
		handleMainButton(navigateToCheckout);

		return () => {
			removeMainButtonEvent(navigateToCheckout);
		};
	}, [navigateToCheckout]);

	useEffect(() => {
		if (isCartEmpty) {
			navigate(-1);
		}
	}, [isCartEmpty, navigate]);

	return createElement(Cart, {
		cartList,
		restaurant,
		navigateToCheckout,
	});
};
