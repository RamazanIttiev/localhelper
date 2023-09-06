import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Event, House } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, styled } from '@mui/material';

const CustomBottomNavigationAction = styled(BottomNavigationAction)(``, ({ theme }) => ({
	color: theme.palette.action.disabled,

	'&.Mui-selected': {
		color: theme.palette.action.selected,
	},
}));

export const Footer = () => {
	const navigate = useNavigate();
	const [activeButton, setActiveButton] = useState(0);

	return (
		<BottomNavigation
			sx={{
				height: '42px',
				background: '#303030',
				position: 'fixed',
				width: '100%',
				bottom: 0,
				zIndex: 1,
			}}
			value={activeButton}
			onChange={(event, newValue) => {
				setActiveButton(newValue);
			}}>
			<CustomBottomNavigationAction
				onClick={() => navigate('/')}
				icon={
					<Box>
						<House fontSize={'medium'} />
					</Box>
				}
			/>
			<CustomBottomNavigationAction
				onClick={() => navigate('/feed')}
				icon={
					<Box>
						<Event fontSize={'medium'} />
					</Box>
				}
			/>
		</BottomNavigation>
	);
};
