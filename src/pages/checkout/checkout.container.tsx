import { useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { ExchangeContainer } from 'pages/checkout/exchange-checkout/exchange-checkout.container.tsx';
import { FlowersCheckoutContainer } from 'pages/checkout/flowers-checkout/flowers-checkout.container.tsx';
import { RentCheckoutContainer } from 'pages/checkout/rent-checkout/rent-checkout.container.tsx';
import { RestaurantCheckoutContainer } from 'pages/checkout/restaurant-checkout/restaurant-checkout.container.tsx';
import { ToursCheckoutContainer } from 'pages/checkout/tours-checkout/tours-checkout.container.tsx';
import { TransferCheckoutContainer } from 'pages/checkout/transfer-checkout/transfer-checkout.container.tsx';

import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';
import { openTelegram } from 'common/utils/service.ts';

import { ActionButton } from 'ui/atoms/actionButton.tsx';

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
