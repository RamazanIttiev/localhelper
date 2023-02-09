import React, { FC, useCallback } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Icon,
	ListItemIcon,
	ListItemButton,
	ListItem,
	List,
	Divider,
	ListItemText,
	Drawer,
} from '@mui/material';

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

	const list = (
		<Box role="presentation" onClick={handleToggle(false)}>
			<List>
				<ListItem key={1} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Icon>restaurant</Icon>
						</ListItemIcon>
						<ListItemText primary={'Food'} />
					</ListItemButton>
				</ListItem>
				<ListItem key={2} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Icon>auto_fix_normal</Icon>
						</ListItemIcon>
						<ListItemText primary={'Weed'} />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
		</Box>
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
					<Drawer anchor="left" open={open} onClose={handleToggle(false)}>
						{list}
					</Drawer>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
