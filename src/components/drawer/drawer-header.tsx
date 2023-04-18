import React from 'react';
import { theme } from '../../theme';
import { Box, Icon, IconButton } from '@mui/material';

interface DrawerHeaderProps {
	icon?: string;
	toggleDrawer: (value: boolean) => () => void;
}

export const DrawerHeader = ({ icon = 'close', toggleDrawer }: DrawerHeaderProps) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				borderTopLeftRadius: 16,
				borderTopRightRadius: 16,
				right: 0,
				left: 0,
				zIndex: 100,
				backgroundColor: theme.palette.background.default,
				height: '72px',
				top: '-72px',
			}}>
			<Box
				sx={{
					width: 30,
					height: 6,
					backgroundColor: '#fff',
					borderRadius: 3,
					position: 'absolute',
					top: '1rem',
					left: 'calc(50% - 15px)',
				}}
			/>
			<IconButton
				sx={{ position: 'absolute', right: 8, top: '1rem', color: '#fff' }}
				onClick={toggleDrawer(false)}>
				<Icon>{icon}</Icon>
			</IconButton>
		</Box>
	);
};
