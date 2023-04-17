import React from 'react';
import { Products } from '../products/products';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { Box, Container, Icon, IconButton, Typography } from '@mui/material';

import moochies from '../../assets/moochies.jpg';
import { useNavigate } from 'react-router-dom';

export const RestaurantUI = () => {
	const navigate = useNavigate();

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
				src={moochies}
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
					background: ' linear-gradient(to bottom, rgba(255,255,255, 0), rgba(33,33,33, 1))',
				}}>
				<Typography variant={'body1'} fontSize={'2rem'}>
					Moochie's
				</Typography>
			</Box>
			<Container sx={{ pt: 4, pb: 11 }} maxWidth={'md'}>
				<Products />
			</Container>
		</Box>
	);
};
