import React, { FC, useCallback } from 'react';
import { AppBar, Box, Toolbar, IconButton, Icon, Drawer } from '@mui/material';
import { Menu } from '../../components/menu';

interface HeaderComponentProps {
	open: boolean;
	toggleMenu: (isOpened: boolean) => void;
}
export const HeaderComponent: FC<HeaderComponentProps> = ({ open, toggleMenu }) => {
	const handleToggle = useCallback(
		(isOpened: boolean) => () => {
			toggleMenu(!isOpened);
		},
		[toggleMenu],
	);

	return (
		<Box>
			<AppBar position="fixed">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<IconButton size="large" color="inherit" aria-label="open drawer" onClick={handleToggle(true)}>
						<Icon>menu</Icon>
					</IconButton>
					<IconButton color="inherit">
						<Icon>shopping_cart</Icon>
					</IconButton>
					<Drawer
						sx={{
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%' },
						}}
						anchor="left"
						open={open}
						onClose={handleToggle(false)}>
						<Menu handleToggle={handleToggle} />
					</Drawer>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
