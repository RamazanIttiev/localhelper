import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import TrashBin from 'assets/svg/trashBin.svg?react';

import { Box, Typography, IconButton, Icon } from '@mui/material';

import { useCartService } from 'pages/cart/domain/service/cart.service.ts';

import { hideMainButton } from 'actions/webApp-actions.ts';

export const CartHeader = ({ restaurantTitle }: { restaurantTitle?: string }) => {
	const { clearCart } = useCartService();
	const [impactOccurred] = useHapticFeedback();

	const handleClearCart = () => {
		impactOccurred('light');
		const answer = confirm('Do you want to clear your cart?');
		answer && clearCart();
		answer && hideMainButton();
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			<Typography variant={'subtitle1'}>{restaurantTitle}</Typography>
			<IconButton size={'small'} color={'inherit'} sx={{ ml: 'auto' }} onClick={handleClearCart}>
				<Icon>
					<TrashBin />
				</Icon>
			</IconButton>
		</Box>
	);
};
