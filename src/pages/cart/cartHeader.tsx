import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import { hideMainButton } from '../../actions/webApp-actions';

export const CartHeader = ({ restaurantTitle }: { restaurantTitle?: string }) => {
	const { clearCart } = useCart();

	const handleClearCart = () => {
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
			<IconButton size={'large'} color={'inherit'} sx={{ ml: 'auto' }} onClick={handleClearCart}>
				<Icon>delete</Icon>
			</IconButton>
		</Box>
	);
};
