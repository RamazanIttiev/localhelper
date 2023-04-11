import React from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { AppBar, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import { isUserAgentTelegram } from '../utils/deviceInfo';

export const Header = () => {
	const navigate = useNavigate();
	const categoryTitle = useMatch(':categoryId');

	return (
		<AppBar position={'static'} color={'secondary'} sx={{ height: '42px' }}>
			<Toolbar sx={{ justifyContent: 'center', minHeight: '100%', p: 1 }}>
				{!isUserAgentTelegram && (
					<IconButton
						sx={{ position: 'absolute', left: 8, top: 0 }}
						color={'inherit'}
						size={'large'}
						onClick={() => navigate(-1)}>
						<Icon>arrow_circle_left</Icon>
					</IconButton>
				)}
				<Typography textAlign={'center'} variant={'h5'} textTransform={'capitalize'}>
					{categoryTitle?.params.categoryId}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
