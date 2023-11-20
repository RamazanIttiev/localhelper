import React from 'react';
import { useParams } from 'react-router-dom';
import { ActionButton } from 'reactkit/actionButton';

import { Container } from '@mui/material';

import { ExchangeContainer } from 'pages/checkout/exchange-checkout/exchange-checkout.container';
import { FlowersCheckoutContainer } from 'pages/checkout/flowers-checkout/flowers-checkout.container';
import { RentCheckoutContainer } from 'pages/checkout/rent-checkout/rent-checkout.container';
import { RestaurantCheckoutContainer } from 'pages/checkout/restaurant-checkout/restaurant-checkout.container';
import { ToursCheckoutContainer } from 'pages/checkout/tours-checkout/tours-checkout.container';
import { TransferCheckoutContainer } from 'pages/checkout/transfer-checkout/transfer-checkout.container';

import { isUserAgentTelegram } from 'utils/deviceInfo';
import { openTelegram } from 'utils/service';

const containerStyles = { pt: '1rem', pb: '1rem', position: 'relative' };

const renderCheckoutContainer = (categoryId: string | undefined) => {
	switch (categoryId) {
		case 'food': {
			return (
				<Container maxWidth={'sm'} sx={containerStyles}>
					<RestaurantCheckoutContainer />
				</Container>
			);
		}
		case 'transfer': {
			return (
				<Container maxWidth={'sm'} sx={containerStyles}>
					<TransferCheckoutContainer />
				</Container>
			);
		}
		case 'tours': {
			return (
				<Container maxWidth={'sm'} sx={containerStyles}>
					<ToursCheckoutContainer />
				</Container>
			);
		}
		case 'exchange': {
			return <ExchangeContainer />;
		}
		case 'flowers': {
			return (
				<Container maxWidth={'sm'} sx={containerStyles}>
					<FlowersCheckoutContainer />
				</Container>
			);
		}
		case 'rent': {
			return (
				<Container maxWidth={'sm'} sx={containerStyles}>
					<RentCheckoutContainer />
				</Container>
			);
		}
		default: {
			return null;
		}
	}
};

export const CheckoutContainer = () => {
	const { categoryId } = useParams();

	return (
		<>
			{renderCheckoutContainer(categoryId)}

			{!isUserAgentTelegram && (
				<ActionButton isMainButton text={'Order in telegram'} handleClick={openTelegram} />
			)}
		</>
	);
};
