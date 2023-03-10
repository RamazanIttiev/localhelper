import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, IconButton } from '@mui/material';

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
	const [activeButton, setActiveButton] = useState(0);

	return (
		<BottomNavigation
			sx={{ background: '#ff335f', position: 'fixed', width: '100%', bottom: 0 }}
			value={activeButton}
			onChange={(event, newValue) => {
				setActiveButton(newValue);
			}}>
			<BottomNavigationAction
				icon={
					<IconButton
						sx={{
							background: '#ff335f',
							borderRadius: ' 50%',
							width: '48px',
							height: '48px',
							color: '#fff',
						}}>
						home
						{/*<Icon sx={{ color: '#fff' }} fontSize={'small'}>*/}
						{/*	house*/}
						{/*</Icon>*/}
					</IconButton>
				}
				component={Link}
				to={'/'}
			/>
		</BottomNavigation>
	);
};
