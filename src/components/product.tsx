import React, { FC, useEffect, useState } from 'react';

import { Telegram } from '../app/App';
import { getAirtableView } from '../hooks';
import { ErrorType } from '../models/error';
import { isProductInCart } from '../utils/cart';
import { AmountButtons } from './amountButtons';
import { InfoBadge } from './reactkit/infoBadge';
import { Link, useMatch } from 'react-router-dom';
import { ProductModel } from '../models/productModel';
import { LoaderButton } from './reactkit/loaderButton';
import { clearResponseMessage, handleOrder } from '../actions/global-actions';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface ProductProps {
	product: ProductModel;
	cartProducts: ProductModel[];
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const Product: FC<ProductProps> = ({ cartProducts, product, addToCart, removeFromCart }) => {
	const routeData = useMatch('/:categoryId');
	const [loading, setLoading] = useState(false);
	const [errorState, setErrorState] = useState<ErrorType>({
		message: '',
		isError: null,
	});

	useEffect(() => {
		clearResponseMessage(errorState, handleError);
	}, [errorState]);

	const { title, price, image, infoBadges } = product;
	const productInCart = isProductInCart(cartProducts, product);

	const idForBot = getAirtableView(routeData?.params.categoryId);

	const handleLoading = (value: boolean) => setLoading(value);
	const handleError = (value: ErrorType) => setErrorState(value);

	return (
		<Card
			onClick={() => Telegram.WebApp.HapticFeedback.impactOccurred('soft')}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				pb: 2,
				height: 'auto',
				borderRadius: 2,
				minHeight: '296px',
			}}>
			<Link to={title.toLowerCase()} style={{ position: 'relative' }}>
				{image ? (
					<>
						<CardMedia component="img" image={image[0].url} alt={image[0].alt} sx={{ height: '11rem' }} />
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
							height: '10rem',
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
						'&:last-child': { pb: 0, pt: 0.5 },
						height: '100%',
						display: 'flex',
						alignItems: 'baseline',
						flexDirection: 'column',
						justifyContent: 'center',
						m: '8px auto',
					}}>
					<Typography
						sx={{
							mb: 1,
							m: '0px auto',
							display: 'flex',
							fontSize: '16px',
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
			<CardActions sx={{ flexDirection: 'column', p: '0 16px 0 16px' }}>
				{routeData?.pathname === '/food' ? (
					productInCart ? (
						<AmountButtons
							product={product}
							amount={productInCart.amount!}
							addToCart={addToCart}
							removeFromCart={removeFromCart}
						/>
					) : (
						<Button
							sx={{ borderRadius: 2, textTransform: 'inherit' }}
							variant={'contained'}
							fullWidth
							onClick={() => addToCart(product)}>
							<strong>Rs {price}</strong>
						</Button>
					)
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
