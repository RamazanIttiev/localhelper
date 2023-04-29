import React, { useEffect } from 'react';
import { useCart } from '../cart/hooks/useCart';
import { Button, Container, Grid } from '@mui/material';
import { useReactRouter } from '../../hooks/useReactRouter';
import { ProductContainer } from '../../components/product/product.container';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	handleMainButton,
	hideMainButton,
	removeMainButtonEvent,
	setMainButtonText,
	showMainButton,
} from '../../actions/webApp-actions';
import { Header } from './header';
import { ProductModel } from '../../models/productModel';

export const Products = () => {
	const navigate = useNavigate();
	const { products, category, flowId, isServiceRoute } = useReactRouter();
	const { removeFromCart, addToCart, cartProducts, isCartEmpty } = useCart();

	const { state } = useLocation();

	useEffect(() => {
		if (isServiceRoute && !isCartEmpty) {
			showMainButton();
			setMainButtonText('Order');
			handleMainButton(() => navigate('/services/food/shopping-cart'));
		} else hideMainButton();

		return () => {
			hideMainButton();
			removeMainButtonEvent(() => navigate('/services/food/shopping-cart'));
		};
	}, [isServiceRoute, isCartEmpty, navigate]);

	const restaurantHeader = {
		title: category?.HeaderTitle || state.Title,
		image: (category?.HeaderImage !== undefined && category?.HeaderImage[0]?.url) || state.Image[0].url,
		workingStatus: state.workingStatus,
		workingTime: state.workingTime,
		location: state.Location,
	};
	const renderProducts = products?.length !== 0 ? products : state.Products;

	return (
		<>
			<Header {...restaurantHeader} />
			<Container sx={{ pt: 2 }} maxWidth={'md'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{renderProducts?.map((product: ProductModel) => {
						return (
							<Grid item xs={6} md={5} key={product.id}>
								<ProductContainer
									flowId={flowId}
									product={product}
									addToCart={addToCart}
									cartProducts={cartProducts}
									removeFromCart={removeFromCart}
									workingStatus={state.workingStatus}
									amountButtonsVisible={isServiceRoute}
								/>
							</Grid>
						);
					})}
				</Grid>
				{!isCartEmpty && isServiceRoute && !isUserAgentTelegram && (
					<Button
						sx={{
							left: '50%',
							bottom: '1rem',
							width: '50%',
							position: 'fixed',
							transform: 'translate(-50%)',
						}}
						variant={'contained'}
						onClick={() => navigate('/services/food/shopping-cart')}>
						Order
					</Button>
				)}
			</Container>
		</>
	);
};
