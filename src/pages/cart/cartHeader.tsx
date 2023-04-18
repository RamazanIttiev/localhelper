import React from 'react';
import { Box, Icon, IconButton } from '@mui/material';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { useNavigate } from 'react-router-dom';
import { useCart } from './hooks/useCart';

export const CartHeader = () => {
	const { clearCart } = useCart();
	const navigate = useNavigate();

	const handleClearCart = () => {
		clearCart();
		navigate(-1);
	};
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			{!isUserAgentTelegram && (
				<IconButton color={'inherit'} size={'large'} onClick={() => navigate(-1)}>
					<Icon>arrow_circle_left</Icon>
				</IconButton>
			)}
			<IconButton size={'large'} color={'inherit'} sx={{ ml: 'auto' }} onClick={handleClearCart}>
				<Icon>delete</Icon>
			</IconButton>
		</Box>
	);
};
