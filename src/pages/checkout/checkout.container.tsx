import React from 'react';
import { useParams } from 'react-router-dom';
import { LoaderButton } from 'reactkit/loaderButton';

import { Container } from '@mui/material';

import { BikesCheckoutContainer } from 'pages/checkout/bikes-checkout/bikes-checkout.container';
import { ExchangeContainer } from 'pages/checkout/exchange-checkout/exchange-checkout.container';
import { FlowersCheckoutContainer } from 'pages/checkout/flowers-checkout/flowers-checkout.container';
import { RentCheckoutContainer } from 'pages/checkout/rent-checkout/rent-checkout.container';
import { RestaurantCheckoutContainer } from 'pages/checkout/restaurant-checkout/restaurant-checkout.container';
import { ToursCheckoutContainer } from 'pages/checkout/tours-checkout/tours-checkout.container';
import { TransferCheckoutContainer } from 'pages/checkout/transfer-checkout/transfer-checkout.container';

import { isUserAgentTelegram } from 'utils/deviceInfo';
import { openTelegram } from 'utils/service';

const renderCheckoutContainer = (categoryId: string | undefined) => {
	switch (categoryId) {
		case 'food': {
			return <RestaurantCheckoutContainer />;
		}
		case 'transport': {
			return <BikesCheckoutContainer />;
		}
		case 'transfer': {
			return <TransferCheckoutContainer />;
		}
		case 'tours': {
			return <ToursCheckoutContainer />;
		}
		case 'exchange': {
			return <ExchangeContainer />;
		}
		case 'flowers': {
			return <FlowersCheckoutContainer />;
		}
		case 'rent': {
			return <RentCheckoutContainer />;
		}
		default: {
			return null;
		}
	}
};

export const CheckoutContainer = () => {
	const { categoryId } = useParams();

	return (
		<Container maxWidth={'sm'} sx={{ pt: '1rem', pb: '1rem', position: 'relative' }}>
			{renderCheckoutContainer(categoryId)}

			{!isUserAgentTelegram && (
				<LoaderButton isMainButton text={'Order in telegram'} handleClick={openTelegram} />
			)}
		</Container>
	);
};
