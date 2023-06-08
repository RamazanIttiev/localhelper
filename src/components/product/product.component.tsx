import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ErrorType } from '../../models/error.model';
import { ImageBackdrop } from './imageBackdrop';
import { AmountButtons, CART_ACTION } from '../amountButtons';
import { InfoBadge } from '../../reactkit/infoBadge';
import { IconBadge } from '../../reactkit/iconBadge';
import { setHaptic } from '../../actions/webApp-actions';
import { LoaderButton } from '../../reactkit/loaderButton';
import { ProductModel, RestaurantModel } from '../../models/product.model';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { isFood } from '../../utils/typeGuard';
import { useShoppingCart } from '../../context/cart.context';
import { useReactRouter } from '../../hooks/useReactRouter';

import { ImageLazy } from '../imageLazy';

interface ProductProps {
	flowId: string;
	loading: boolean;
	product: ProductModel;
	errorState: ErrorType;
	restaurant: RestaurantModel | undefined;
	handleProductAmount?: (action: CART_ACTION) => void;
	handleProductOrder: () => Promise<Response | undefined>;
}

export const ProductComponent: FC<ProductProps> = ({
	flowId,
	loading,
	product,
	restaurant,
	errorState,
	handleProductOrder,
	handleProductAmount,
}) => {
	const { getItemAmount } = useShoppingCart();
	const { isRestaurantRoute } = useReactRouter();

	const productAmount = getItemAmount(product.id);

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
					state={{ ...product, restaurant, flowId }}
					style={{ position: 'relative' }}>
					{product.image && (
						<>
							<ImageLazy
								smallImageUrl={product.image[0].thumbnails.small.url}
								imageUrl={product.image[0].url}
								containerStyles={{ height: '11rem', borderRadius: '1rem' }}
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
					)}
					{productAmount !== 0 && (
						<ImageBackdrop>
							<Typography variant={'body1'} fontSize={'1.5rem'}>
								{productAmount}
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
				{restaurant?.isWorking === undefined || restaurant?.isWorking ? (
					<CardActions
						sx={{
							p: 0,
						}}>
						{isRestaurantRoute && product && isFood(product) ? (
							<AmountButtons handleProductAmount={handleProductAmount} showText product={product} />
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
