import React, { FC } from 'react';
import { ProductModel } from '../models/productModel';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Icon, Typography, Badge } from '@mui/material';

interface HeaderProps {
	cartProducts: ProductModel[];
	handleEmptyCart: () => void;
}

export const Header: FC<HeaderProps> = ({ cartProducts, handleEmptyCart }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const categoryTitle = useMatch(':categoryId');
	const productRouteData = useMatch('/food/:productId');

	const cartTotalAmount = cartProducts.reduce((previous, current): number => {
		return previous + current.amount;
	}, 0);

	const handleNavigate = () => (productRouteData?.pattern.path === ':categoryId' ? navigate('/') : navigate(-1));

	return (
		<AppBar position={'static'} color={'secondary'} sx={{ height: '42px' }}>
			<Toolbar sx={{ justifyContent: 'center', minHeight: '100%', p: 1 }}>
				<IconButton
					sx={{ position: 'absolute', left: 8, top: 0 }}
					color={'inherit'}
					size={'large'}
					onClick={handleNavigate}>
					<Icon>arrow_circle_left</Icon>
				</IconButton>
				{pathname !== '/' && (
					<Typography textAlign={'center'} variant={'h5'} textTransform={'capitalize'}>
						{categoryTitle?.params.categoryId}
					</Typography>
				)}
				{(pathname === '/food' || productRouteData?.pattern.path === '/food/:productId') &&
				cartProducts.length !== 0 ? (
					<IconButton
						sx={{ position: 'absolute', right: 8, top: 4 }}
						color={'inherit'}
						onClick={() => navigate('/shopping-cart')}>
						<Badge badgeContent={cartTotalAmount} color={'primary'}>
							<Icon>shopping_cart</Icon>
						</Badge>
					</IconButton>
				) : (
					pathname === '/shopping-cart' && (
						<IconButton
							sx={{ position: 'absolute', right: 8, top: 4 }}
							color={'inherit'}
							onClick={handleEmptyCart}>
							<Icon>delete</Icon>
						</IconButton>
					)
				)}
			</Toolbar>
		</AppBar>
	);
};
