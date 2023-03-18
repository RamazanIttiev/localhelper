import React, { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, styled, useTheme } from '@mui/material';
import { House } from '@mui/icons-material';

interface FooterProps {}

const CustomBottomNavigationAction = styled(BottomNavigationAction)(`
  color: #fff;
  transition: all 0.4s ease;
  &.Mui-selected svg {
  	width: 2rem;
    height: 2rem;
    padding: 8px;
		color: #fff;
		border-radius: 50%;
		background: #0088CC;
  }
`);

export const Footer: FC<FooterProps> = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [activeButton, setActiveButton] = useState(0);

	return (
		<BottomNavigation
			sx={{
				background: theme.palette.secondary.main,
				position: 'fixed',
				width: '100%',
				bottom: 0,
			}}
			value={activeButton}
			onChange={(event, newValue) => {
				console.log(newValue);
				setActiveButton(newValue);
			}}>
			<CustomBottomNavigationAction
				onClick={() => navigate('/')}
				icon={<House sx={{ transition: ' all 0.4s ease' }} fontSize={'small'} />}
			/>
		</BottomNavigation>
	);
};
