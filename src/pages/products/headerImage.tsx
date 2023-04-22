import React from 'react';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import { theme } from '../../theme';
import { useNavigate } from 'react-router-dom';

export const HeaderImage = ({ image, title }: { image: string; title: string }) => {
	const navigate = useNavigate();

	return (
		<>
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
				src={image}
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
					{title}
				</Typography>
			</Box>
		</>
	);
};
