import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { House } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, styled, useTheme } from '@mui/material';

interface FooterProps {}

const CustomBottomNavigationAction = styled(BottomNavigationAction)(`
  color: #fff;
  
  &.Mui-selected {
		color: #fff;
		
		.MuiBox-root {
			height: 3rem;
			width: 3rem;
			display: flex;
			border-radius: 50%;
			background: #0088CC;
			align-items: center;
			justify-content: center;
			transition: all 0.4s;
  	}
  }
`);

export const Footer: FC<FooterProps> = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [activeButton, setActiveButton] = useState(0);

	return (
		<BottomNavigation
			sx={{
				background: theme.palette.background.default,
				position: 'fixed',
				width: '100%',
				bottom: 0,
				p: '4px 0',
			}}
			value={activeButton}
			onChange={(event, newValue) => {
				setActiveButton(newValue);
			}}>
			<CustomBottomNavigationAction
				onClick={() => navigate('/')}
				icon={
					<Box>
						<House fontSize={'large'} sx={{ transition: 'all 0.4s' }} />
					</Box>
				}
			/>
		</BottomNavigation>
	);
};
