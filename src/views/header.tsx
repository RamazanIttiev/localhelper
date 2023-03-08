import React, { FC } from 'react';
import { AppBar, Toolbar, IconButton, Icon } from '@mui/material';
// import { ProductModel } from '../models/productModel';
import { sendWebAppDeepLink } from '../utils/phpRequest';

interface HeaderProps {
	// cart: ProductModel[];
	// toggleCart: () => void;
}
export const Header: FC<HeaderProps> = () => {
	// const cartTotalAmount = cart.reduce((previous, current): number => {
	// 	return previous + current.amount;
	// }, 0);

	return (
		<AppBar position={'static'} sx={{ height: '42px' }}>
			<Toolbar sx={{ justifyContent: 'space-between', minHeight: '100%' }}>
				<IconButton
					size="large"
					color="inherit"
					onClick={() => sendWebAppDeepLink('ZGw6MTI3Mjc4', 'lhelper', {})}>
					<Icon>redeem</Icon>
				</IconButton>
				<IconButton
					size="large"
					color="inherit"
					onClick={() => sendWebAppDeepLink('ZGw6MTI3Mjgx', 'lhelper', {})}>
					<Icon>currency_exchange</Icon>
				</IconButton>
				{/*<IconButton color="inherit" onClick={toggleCart}>*/}
				{/*	<Badge badgeContent={cartTotalAmount} color={'primary'}>*/}
				{/*		<Icon>shopping_cart</Icon>*/}
				{/*	</Badge>*/}
				{/*</IconButton>*/}
			</Toolbar>
		</AppBar>
	);
};
