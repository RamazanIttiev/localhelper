import React from 'react';
import { theme } from '../../theme';
import { Box } from '@mui/material';
import { CartList } from './cart-list';
import { CartHeader } from './cartHeader';
import { LoaderButton } from '../../reactkit/loaderButton';
import { isUserAgentTelegram } from '../../utils/deviceInfo';

interface CartProps {
	restaurantTitle?: string;
	isRestaurantWorking?: boolean;
	restaurantWorkingTime?: string;
	navigateToCheckout: () => void;
}

export const CartUI = ({
	restaurantTitle,
	navigateToCheckout,
	isRestaurantWorking,
	restaurantWorkingTime,
}: CartProps) => {
	return (
		<>
			<CartHeader restaurantTitle={restaurantTitle} />
			<CartList />
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
						disabled={!isRestaurantWorking}
						handleClick={navigateToCheckout}
						text={isRestaurantWorking ? 'Checkout' : `Working time - ${restaurantWorkingTime}`}
					/>
				)}
			</Box>
		</>
	);
};
