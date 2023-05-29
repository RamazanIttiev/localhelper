import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ErrorType } from '../../models/error';
import { ImageBackdrop } from './imageBackdrop';
import { AmountButtons, CART_ACTION } from '../amountButtons';
import { InfoBadge } from '../../reactkit/infoBadge';
import { IconBadge } from '../../reactkit/iconBadge';
import { setHaptic } from '../../actions/webApp-actions';
import { LoaderButton } from '../../reactkit/loaderButton';
import { FoodModel, ProductModel } from '../../models/productModel';
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import dishImage from '../../assets/food.webp';
import { isFood } from '../../utils/typeGuard';

interface ProductProps {
	loading: boolean;
	errorState: ErrorType;
	product: ProductModel;
	productFromCart?: FoodModel;
	isRestaurantWorking?: boolean;
	amountButtonsVisible?: boolean;
	handleProductAmount?: (action: CART_ACTION) => void;
	handleProductOrder: () => Promise<Response | undefined>;
}

export const ProductComponent: FC<ProductProps> = ({
	loading,
	product,
	errorState,
	productFromCart,
	handleProductOrder,
	isRestaurantWorking,
	amountButtonsVisible,
	handleProductAmount,
}) => {
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
				<Link
					key={product.id}
					to={product.title.toLowerCase()}
					state={{ ...product }}
					style={{ position: 'relative' }}>
					{product.image ? (
						<>
							<CardMedia
								component="img"
								image={product.image[0].url}
								alt={product.image[0].alt}
								sx={{ height: '11rem', borderRadius: '1rem' }}
							/>
							{product.infoBadges?.map(icon => (
								<IconBadge
									key={icon}
									icon={icon}
									containerStyles={{
										position: 'absolute',
										top: '0.5rem',
										left: '0.5rem',
									}}
									iconStyles={{ margin: '0 2px' }}
								/>
							))}
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
					{productFromCart && (
						<ImageBackdrop>
							<Typography variant={'body1'} fontSize={'1.5rem'}>
								{productFromCart.amount}
							</Typography>
						</ImageBackdrop>
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
							{product.title.toLowerCase()}
						</Typography>
					</CardContent>
				</Link>
				{isRestaurantWorking === undefined || isRestaurantWorking ? (
					<CardActions
						sx={{
							p: 0,
						}}>
						{amountButtonsVisible && product && isFood(product) ? (
							<AmountButtons
								handleProductAmount={handleProductAmount}
								showText
								product={product}
								productFromCart={productFromCart}
							/>
						) : (
							<LoaderButton
								loading={loading}
								errorState={errorState}
								text={`${product.price} Rs`}
								handleClick={handleProductOrder}
							/>
						)}
					</CardActions>
				) : (
					<InfoBadge text={'We are closed'} />
				)}
			</Card>
		</>
	);
};
