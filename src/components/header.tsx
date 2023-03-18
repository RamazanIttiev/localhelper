import React, { FC } from 'react';
import { AppBar, Toolbar, IconButton, Icon, Typography } from '@mui/material';
// import { ProductModel } from '../models/productModel';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface HeaderProps {
	// cart: ProductModel[];
	// toggleCart: () => void;
}
export const Header: FC<HeaderProps> = () => {
	const navigate = useNavigate();
	const { category } = useParams();
	const { pathname } = useLocation();
	// const cartTotalAmount = cart.reduce((previous, current): number => {
	// 	return previous + current.amount;
	// }, 0);

	return (
		<AppBar position={'static'} color={'secondary'}>
			<Toolbar sx={{ justifyContent: 'center', minHeight: '100%', p: 1 }}>
				<IconButton sx={{ position: 'absolute', left: 0 }} color={'inherit'} onClick={() => navigate(-1)}>
					<Icon>arrow_circle_left</Icon>
				</IconButton>
				{pathname !== '/' && (
					<Typography textAlign={'center'} variant={'h5'} textTransform={'capitalize'}>
						{category}
					</Typography>
				)}
			</Toolbar>
		</AppBar>
	);
};
