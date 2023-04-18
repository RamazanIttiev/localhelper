import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import { DrawerHeader } from './drawer-header';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

interface DrawerProps {
	icon?: string;
	isOpened: boolean;
	children: ReactNode;
	swipeAreaWidth?: number;
	toggleDrawer: (value: boolean) => () => void;
}

export const Drawer = ({ icon, isOpened, toggleDrawer, children, swipeAreaWidth = 72 }: DrawerProps) => {
	const theme = useTheme();

	return (
		<SwipeableDrawer
			anchor="bottom"
			open={isOpened}
			keepMounted={true}
			swipeAreaWidth={swipeAreaWidth}
			onOpen={toggleDrawer(true)}
			onClose={toggleDrawer(false)}
			ModalProps={{
				keepMounted: true,
			}}>
			<DrawerHeader icon={icon} toggleDrawer={toggleDrawer} />
			<Box
				sx={{
					height: '100%',
					overflow: 'auto',
					background: theme.palette.background.default,
				}}>
				{children}
			</Box>
		</SwipeableDrawer>
	);
};
