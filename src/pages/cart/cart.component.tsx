import React from 'react';
import { theme } from '../../theme';
import { Box, Container } from '@mui/material';
import { CartList } from './components/cart-list';
import { CartHeader } from './components/cart-header';
import { LoaderButton } from '../../reactkit/loaderButton';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { RestaurantProductModel } from '../restaurant/restaurant-product/restaurant-product.model';
import { RestaurantModel } from '../../models/product.model';

interface Props {
	restaurant: RestaurantModel;
	navigateToCheckout: () => void;
	cartList: RestaurantProductModel[];
}

export const Cart = ({ cartList, restaurant, navigateToCheckout }: Props) => {
	const { title, isWorking, workingTime } = restaurant;

	return (
		<Container maxWidth={'sm'} sx={{ pb: 5 }}>
			<CartHeader restaurantTitle={title} />
			<CartList cartList={cartList} restaurant={restaurant} />
			<Box
				sx={{
					left: 0,
					bottom: 0,
					width: '100%',
					position: 'fixed',
					padding: 2,
					backgroundColor: theme.palette.background.default,
				}}>
				{!isUserAgentTelegram && (
					<LoaderButton
						isMainButton
						disabled={!isWorking}
						handleClick={navigateToCheckout}
						text={isWorking ? 'Checkout' : `Working time - ${workingTime}`}
					/>
				)}
			</Box>
		</Container>
	);
};
