import React from 'react';
import Lottie from 'react-lottie';
import { Box, Button, Typography, useTheme } from '@mui/material';
import errorAnimation from '../../assets/lottie/404-animation.json';
import { useLocation, useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: errorAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const handleClick = () => {
		return pathname === '/' ? null : navigate(-1);
	};

	return (
		<Box
			sx={{
				height: '80vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}>
			<Lottie options={defaultOptions} speed={2} height={'auto'} width={'auto'} />
			<Typography variant={'body1'} fontFamily={'monospace'} mt={1}>
				Looks like some error occurred
			</Typography>
			<Button
				variant={'contained'}
				onClick={handleClick}
				sx={{ mt: '2rem', background: theme.palette.primary.main }}>
				Go back
			</Button>
		</Box>
	);
};
