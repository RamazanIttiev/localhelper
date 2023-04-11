import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ErrorType } from '../models/error';
import { AmountButtons } from './amountButtons';
import { InfoBadge } from './reactkit/infoBadge';
import { getAirtableView } from '../utils/airtable';
import { setHaptic } from '../actions/webApp-actions';
import { LoaderButton } from './reactkit/loaderButton';
import { useReactRouter } from '../hooks/useReactRouter';
import { useProducts } from '../pages/products/hooks/useProducts';
import { ProductModel } from '../pages/productDetails/models/productModel';
import { clearResponseMessage, handleOrder } from '../actions/global-actions';
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductProps {
	product: ProductModel;
	cartProducts: ProductModel[];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const Product: FC<ProductProps> = ({ cartProducts, product, addToCart, removeFromCart }) => {
	const { productsRoute } = useReactRouter();
	const { getProductFromCart } = useProducts();

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

	return (
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
			<Link to={title.toLowerCase()} style={{ position: 'relative' }}>
				{image ? (
					<>
						<CardMedia
							component="img"
							image={image[0].url}
							alt={image[0].alt}
							sx={{ height: '11rem', borderRadius: '2rem' }}
						/>
						{productFromCart && (
							<Box
								sx={{
									top: 0,
									display: 'flex',
									width: '100%',
									height: '11rem',
									borderRadius: '2rem',
									position: 'absolute',
									alignItems: 'center',
									justifyContent: 'center',
									background: 'rgba(0,0,0,0.5)',
								}}>
								<Typography variant={'body1'} fontSize={'1rem'}>
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
					<Typography
						fontSize={'small'}
						sx={{
							p: 1,
							height: '11rem',
							display: 'flex',
							alignItems: 'center',
							fontFamily: 'monospace',
							justifyContent: 'center',
						}}>
						Image is not loaded ;(
					</Typography>
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
			</Link>
			<CardActions
				sx={{
					p: 0,
				}}>
				{productsRoute?.pathname === '/food' ? (
					<AmountButtons
						product={product}
						addToCart={addToCart}
						productFromCart={productFromCart}
						removeFromCart={removeFromCart}
					/>
				) : (
					<LoaderButton
						text={price}
						loading={loading}
						errorState={errorState}
						handleClick={() => handleOrder(idForBot, title, handleLoading, handleError)}
					/>
				)}
			</CardActions>
		</Card>
	);
};
