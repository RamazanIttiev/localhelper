import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { AppBar, Icon, IconButton, Toolbar, Typography } from '@mui/material';
import { isUserAgentTelegram } from '../utils/deviceInfo';

interface HeaderProps {
	cartProducts: ProductModel[];
}

export const Header: FC<HeaderProps> = ({ cartProducts }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const categoryTitle = useMatch(':categoryId');
	const productRouteData = useMatch('/food/:productId');

	const cartTotalAmount = cartProducts.reduce((previous, current): number => {
		if (current.amount !== undefined) {
			return previous + current.amount;
		}
		return previous;
	}, 0);

	return (
		<AppBar position={'static'} color={'secondary'} sx={{ height: '42px' }}>
			<Toolbar sx={{ justifyContent: 'center', minHeight: '100%', p: 1 }}>
				{!isUserAgentTelegram && (
					<IconButton
						sx={{ position: 'absolute', left: 8, top: 0 }}
						color={'inherit'}
						size={'large'}
						onClick={() => navigate(-1)}>
						<Icon>arrow_circle_left</Icon>
					</IconButton>
				)}
				{pathname !== '/' && (
					<Typography textAlign={'center'} variant={'h5'} textTransform={'capitalize'}>
						{categoryTitle?.params.categoryId}
					</Typography>
				)}
			</Toolbar>
		</AppBar>
	);
};
