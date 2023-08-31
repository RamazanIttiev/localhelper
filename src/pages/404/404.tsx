import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Icon, Typography, useTheme } from '@mui/material';

export const ErrorPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { pathname } = useLocation();

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
			<Icon fontSize={'large'}>sentiment_very_dissatisfied</Icon>
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
