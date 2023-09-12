import { createElement } from 'react';
import { useParams } from 'react-router-dom';

import { BikesCheckoutContainer } from 'pages/checkout/bikes-checkout/bikes-checkout.container';
import { RestaurantCheckoutContainer } from 'pages/checkout/restaurant-checkout/restaurant-checkout.container';
import { TransferCheckoutContainer } from 'pages/checkout/transfer-checkout/transfer-checkout.container';

export const CheckoutContainer = () => {
	const { categoryId } = useParams();

	switch (categoryId) {
		case 'food': {
			return createElement(RestaurantCheckoutContainer);
		}
		case 'transport': {
			return createElement(BikesCheckoutContainer);
		}
		case 'transfer': {
			return createElement(TransferCheckoutContainer);
		}
		default: {
			return createElement('');
		}
	}
};
