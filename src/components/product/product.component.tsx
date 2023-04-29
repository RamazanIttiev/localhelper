import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ErrorType } from '../../models/error';
import { ImageBackdrop } from './imageBackdrop';
import { AmountButtons } from '../amountButtons';
import { LoaderButton } from '../reactkit/loaderButton';
import { ProductModel } from '../../models/productModel';
import { setHaptic } from '../../actions/webApp-actions';
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import dishImage from '../../assets/food.jpg';
import { InfoBadge } from '../reactkit/infoBadge';

interface ProductProps {
	loading: boolean;
	workingStatus: string;
	errorState: ErrorType;
	product: ProductModel;
	productFromCart?: ProductModel;
	amountButtonsVisible?: boolean;
	handleProductOrder: () => Promise<void>;
	removeFromCart: (product: ProductModel) => void;
	addToCart: (selectedProduct: ProductModel) => void;
}

export const ProductComponent: FC<ProductProps> = ({
	loading,
	product,
	addToCart,
	errorState,
	workingStatus,
	removeFromCart,
	productFromCart,
	handleProductOrder,
	amountButtonsVisible,
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
					to={product.title.toLowerCase()}
					state={{ ...product, workingStatus }}
					style={{ position: 'relative' }}>
					{product.image ? (
						<>
							<CardMedia
								component="img"
								image={product.image[0].url}
								alt={product.image[0].alt}
								sx={{ height: '11rem', borderRadius: '1rem' }}
							/>
							{product.infoBadges &&
								product.infoBadges.map(icon => (
									<InfoBadge
										icon={icon}
										containerStyles={{
											position: 'absolute',
											top: '0.5rem',
											left: '1.5rem',
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
				{workingStatus === 'Opened' && (
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
								showAmount={false}
							/>
						) : (
							<LoaderButton
								text={product.price}
								loading={loading}
								errorState={errorState}
								textStyles={{ fontSize: '0.8rem' }}
								handleClick={handleProductOrder}
							/>
						)}
					</CardActions>
				)}
			</Card>
		</>
	);
};
