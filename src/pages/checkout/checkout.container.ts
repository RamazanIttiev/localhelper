import { createElement } from 'react';
import { useParams } from 'react-router-dom';

import { BikesCheckoutContainer } from 'pages/checkout/bikes-checkout/bikes-checkout.container';
import { ExchangeContainer } from 'pages/checkout/exchange-checkout/exchange-checkout.container';
import { FlowersCheckoutContainer } from 'pages/checkout/flowers-checkout/flowers-checkout.container';
import { RestaurantCheckoutContainer } from 'pages/checkout/restaurant-checkout/restaurant-checkout.container';
import { ToursCheckoutContainer } from 'pages/checkout/tours-checkout/tours-checkout.container';
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
		case 'tours': {
			return createElement(ToursCheckoutContainer);
		}
		case 'exchange': {
			return createElement(ExchangeContainer);
		}
		case 'flowers': {
			return createElement(FlowersCheckoutContainer);
		}
		default: {
			return createElement('');
		}
	}
};
