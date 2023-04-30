import React from 'react';
import { useCart } from './hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { Box, Icon, IconButton } from '@mui/material';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { hideMainButton } from "../../actions/webApp-actions";

export const CartHeader = () => {
	const { clearCart } = useCart();
	const navigate = useNavigate();

	const handleClearCart = () => {
		clearCart();
		navigate(-1);
		hideMainButton()
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
