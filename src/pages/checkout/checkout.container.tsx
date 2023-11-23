import React from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@mui/material';

import { ExchangeContainer } from 'pages/checkout/exchange-checkout/exchange-checkout.container';
import { RestaurantCheckoutContainer } from 'pages/checkout/restaurant-checkout/restaurant-checkout.container';

import { isUserAgentTelegram } from 'common/utils/deviceInfo';
import { openTelegram } from 'common/utils/service';

import { ActionButton } from 'ui/atoms/actionButton';

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
		case 'exchange': {
			return <ExchangeContainer />;
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
