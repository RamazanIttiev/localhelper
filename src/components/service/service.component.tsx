import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Products } from '../../pages/products/products';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { Box, Button, Container, Icon, IconButton, Typography, useTheme } from '@mui/material';
import { ServiceModel } from './models/service';
import { useCart } from '../../pages/cart/hooks/useCart';
import { useReactRouter } from '../../hooks/useReactRouter';

interface ServiceProps {
	service: ServiceModel;
}

export const ServiceUI = ({ service }: ServiceProps) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { isCartEmpty } = useCart();
	const { isServiceRoute } = useReactRouter();

	return (
		<Box>
			{!isUserAgentTelegram && (
				<IconButton
					sx={{ position: 'absolute', left: 8, top: 0, zIndex: 1 }}
					color={'inherit'}
					size={'large'}
					onClick={() => navigate(-1)}>
					<Icon>arrow_circle_left</Icon>
				</IconButton>
			)}
			<Box
				component="img"
				src={service.image}
				sx={{
					display: 'block',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					width: '100%',
					objectFit: 'cover',
					height: '18rem',
				}}
			/>
			<Box
				sx={{
					top: 0,
					pb: '2rem',
					pl: '2rem',
					width: '100%',
					display: ' flex',
					height: '18rem',
					alignItems: ' end',
					position: 'absolute',
					background: `linear-gradient(to bottom, rgba(255,255,255, 0), ${theme.palette.background.default})`,
				}}>
				<Typography variant={'body1'} fontSize={'2rem'}>
					{service.title}
				</Typography>
			</Box>
			<Container sx={{ pt: 4, pb: 11 }} maxWidth={'md'}>
				<Products />
				{!isCartEmpty && isServiceRoute && !isUserAgentTelegram && (
					<Button
						sx={{
							left: '50%',
							bottom: '1rem',
							width: '50%',
							position: 'fixed',
							transform: 'translate(-50%)',
						}}
						variant={'contained'}
						onClick={() => navigate('/services/food/shopping-cart')}>
						Order
					</Button>
				)}
			</Container>
		</Box>
	);
};
