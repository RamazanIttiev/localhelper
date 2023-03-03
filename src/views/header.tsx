import React, { FC, useCallback, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Icon, Drawer } from '@mui/material';
import { Menu } from '../components/menu';
// import { ProductModel } from '../models/productModel';
import { Link } from 'react-router-dom';

interface HeaderProps {
	// cart: ProductModel[];
	// toggleCart: () => void;
}
export const Header: FC<HeaderProps> = () => {
	const [open, setOpen] = useState(false);

	const toggleMenu = useCallback(
		(isOpened: boolean) => () => {
			setOpen(isOpened);
			toggleMenu(!isOpened);
		},
		[],
	);

	// const cartTotalAmount = cart.reduce((previous, current): number => {
	// 	return previous + current.amount;
	// }, 0);

	return (
		<Box>
			<AppBar position="fixed">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<IconButton size="large" color="inherit" component={Link} to={'/'}>
						<Icon>home</Icon>
					</IconButton>
					<IconButton size="large" color="inherit" aria-label="open drawer" onClick={toggleMenu(true)}>
						<Icon>menu</Icon>
					</IconButton>
					{/*<IconButton color="inherit" onClick={toggleCart}>*/}
					{/*	<Badge badgeContent={cartTotalAmount} color={'primary'}>*/}
					{/*		<Icon>shopping_cart</Icon>*/}
					{/*	</Badge>*/}
					{/*</IconButton>*/}
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
