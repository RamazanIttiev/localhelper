import React, { FC, useCallback, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Icon, Drawer } from '@mui/material';
import { Menu } from '../components/menu';

interface HeaderProps {}
export const Header: FC<HeaderProps> = () => {
	const [open, setOpen] = useState(false);

	const toggleMenu = useCallback(
		(isOpened: boolean) => () => {
			setOpen(isOpened);
			toggleMenu(!isOpened);
		},
		[],
	);

	return (
		<Box>
			<AppBar position="fixed">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<IconButton size="large" color="inherit" aria-label="open drawer" onClick={toggleMenu(true)}>
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
						onClose={toggleMenu(false)}>
						<Menu handleToggle={toggleMenu} />
					</Drawer>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
