import React from 'react';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import { theme } from '../../theme';
import { useNavigate } from 'react-router-dom';

export const HeaderImage = ({ header }: { header: { image: string | undefined; title: string | undefined } }) => {
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
			{header.image && (
				<Box
					component="img"
					src={header.image}
					alt={header.title}
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
			)}
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
					{header.title}
				</Typography>
			</Box>
		</>
	);
};
