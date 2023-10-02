import { MainButton, useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Restaurant } from 'pages/restaurant/restaurant.model';

import { useShoppingCart } from 'context/cart.context';

import { RestaurantProduct } from '../restaurant-product/restaurant-product.model';
import { RestaurantProductDetails } from './restaurant-product-details.component';

interface RouteState {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly restaurantProduct: RestaurantProduct;
}

export const RestaurantProductDetailsContainer = () => {
	const { state } = useLocation();
	const routeState: RouteState = state;

	const navigate = useNavigate();
	const { isCartEmpty } = useShoppingCart();

	const [impactOccurred] = useHapticFeedback();

	const flowId = useMemo(() => routeState.flowId, [routeState.flowId]);
	const restaurant = useMemo(() => routeState.restaurant, [routeState.restaurant]);
	const restaurantProduct = useMemo(() => routeState.restaurantProduct, [routeState.restaurantProduct]);

	const navigateToCart = useCallback(() => {
		impactOccurred('light');
		navigate('/shopping-cart', {
			state: {
				flowId,
				restaurant,
			},
		});
	}, [impactOccurred, navigate, flowId, restaurant]);

	return (
		<>
			<RestaurantProductDetails restaurantProduct={restaurantProduct} restaurant={restaurant} />
			{!isCartEmpty && <MainButton text={'To Cart'} onClick={navigateToCart} />}
		</>
	);
};
