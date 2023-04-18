import React, { FC, useEffect, useState } from 'react';
import { ErrorType } from '../models/error';
import { AmountButtons } from './amountButtons';
import { InfoBadge } from './reactkit/infoBadge';
import { getAirtableView } from '../utils/airtable';
import { setHaptic } from '../actions/webApp-actions';
import { LoaderButton } from './reactkit/loaderButton';
import { useReactRouter } from '../hooks/useReactRouter';
import { useProducts } from '../pages/products/hooks/useProducts';
import { ProductModel } from '../models/productModel';
import { clearResponseMessage, handleOrder } from '../actions/global-actions';
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { ProductDetailsContainer } from './productDetails/productDetails.container';
import { Drawer } from './drawer/drawer';

import dishImage from '../assets/food.jpg';

interface ProductProps {
	product: ProductModel;
	cartProducts: ProductModel[];
	amountButtonsVisible?: boolean;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const Product: FC<ProductProps> = ({
	cartProducts,
	product,
	addToCart,
	removeFromCart,
	amountButtonsVisible,
}) => {
	const { productsRoute, isServiceRoute } = useReactRouter();
	const { getProductFromCart } = useProducts();
	const [isOpened, setIsOpened] = useState(false);

	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const { title, price, image, infoBadges } = product;

	const productFromCart = getProductFromCart(cartProducts, product);

	const idForBot = getAirtableView(productsRoute?.params.categoryId);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	const toggleProductDetails = (newOpen: boolean) => () => {
		setIsOpened(newOpen);
	};

	const order = isServiceRoute ? { order: title } : { itemName: title };

	return (
		<>
			<Card
				onClick={() => setHaptic('light')}
				sx={{
					pb: 2,
					display: 'flex',
					height: 'auto',
					boxShadow: 'none',
					minHeight: '16rem',
					flexDirection: 'column',
					background: 'transparent',
					justifyContent: 'space-between',
				}}>
				<Box onClick={toggleProductDetails(true)} style={{ position: 'relative' }}>
					{image ? (
						<>
							<CardMedia
								component="img"
								image={image[0].url}
								alt={image[0].alt}
								sx={{ height: '11rem', borderRadius: '1rem' }}
							/>
							{productFromCart && (
								<Box
									sx={{
										top: 0,
										pr: '1rem',
										display: 'flex',
										width: '100%',
										height: '11rem',
										borderRadius: '1rem',
										position: 'absolute',
										alignItems: 'start',
										justifyContent: 'flex-end',
										background: 'rgba(0,0,0,0.5)',
									}}>
									<Typography variant={'body1'} fontSize={'1.5rem'}>
										{productFromCart.amount}
									</Typography>
								</Box>
							)}
							{infoBadges && (
								<InfoBadge
									iterable={infoBadges}
									containerStyles={{
										display: 'flex',
										position: 'absolute',
										top: '0.5rem',
										left: '0.5rem',
									}}
									iconStyles={{ margin: '0 2px' }}
								/>
							)}
						</>
					) : (
						<Box
							component={'img'}
							src={dishImage}
							alt={product.title}
							width={'100%'}
							sx={{
								borderRadius: '1rem',
								height: '11rem',
								width: '100%',
								margin: '0 auto',
								display: 'block',
							}}
						/>
					)}
					<CardContent
						sx={{
							'&:last-child': { pb: 0 },
							p: 0,
							height: '100%',
							display: 'flex',
							alignItems: 'baseline',
							flexDirection: 'column',
							justifyContent: 'center',
							mt: '1rem',
							mb: '0.5rem',
						}}>
						<Typography
							sx={{
								m: 0,
								display: 'flex',
								fontSize: '0.8rem',
								fontWeight: '600',
								alignItems: 'center',
								justifyContent: 'center',
								textTransform: 'capitalize',
							}}
							component="h3">
							{title.toLowerCase()}
						</Typography>
					</CardContent>
				</Box>
				<CardActions
					sx={{
						p: 0,
					}}>
					{amountButtonsVisible ? (
						<AmountButtons
							product={product}
							addToCart={addToCart}
							productFromCart={productFromCart}
							removeFromCart={removeFromCart}
							showAmount={isOpened}
						/>
					) : (
						<LoaderButton
							text={price}
							loading={loading}
							errorState={errorState}
							textStyles={{ fontSize: '0.8rem' }}
							handleClick={() => handleOrder(idForBot, order, handleLoading, handleError)}
						/>
					)}
				</CardActions>
			</Card>

			<Drawer
				isOpened={isOpened}
				toggleDrawer={toggleProductDetails}
				children={<ProductDetailsContainer product={product} />}
			/>
		</>
	);
};
