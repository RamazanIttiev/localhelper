import React, { FC } from 'react';
import { AppBar, Toolbar, IconButton, Icon, Typography } from '@mui/material';
// import { ProductModel } from '../models/productModel';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

interface HeaderProps {
	// cart: ProductModel[];
	// toggleCart: () => void;
}
export const Header: FC<HeaderProps> = () => {
	const navigate = useNavigate();
	const pathData = useMatch(':categoryId');
	const { pathname } = useLocation();
	// const cartTotalAmount = cart.reduce((previous, current): number => {
	// 	return previous + current.amount;
	// }, 0);
	return (
		<AppBar position={'static'} color={'secondary'} sx={{ height: '42px' }}>
			<Toolbar sx={{ justifyContent: 'center', minHeight: '100%', p: 1 }}>
				<IconButton
					sx={{ position: 'absolute', left: 8, top: 0 }}
					color={'inherit'}
					size={'large'}
					onClick={() => navigate(-1)}>
					<Icon>arrow_circle_left</Icon>
				</IconButton>
				{pathname !== '/' && (
					<Typography textAlign={'center'} variant={'h5'} textTransform={'capitalize'}>
						{pathData?.params.categoryId}
					</Typography>
				)}
			</Toolbar>
		</AppBar>
	);
};
