import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { setHaptic } from '../../../../actions/webApp-actions';
import { Link } from 'react-router-dom';
import { IconBadge } from '../../../../reactkit/iconBadge';
import { ImageBackdrop } from '../../../../components/product/imageBackdrop';
import { AmountButtons } from '../../../../components/amountButtons';
import { InfoBadge } from '../../../../reactkit/infoBadge';
import { RestaurantProductModel } from './restaurant-product.model';

interface Props {
	readonly flowId: string;
	readonly restaurantTitle: string;
	readonly isRestaurantWorking: boolean;
	readonly restaurantProduct: RestaurantProductModel;
}

export const RestaurantProductCard = ({ flowId, restaurantProduct, isRestaurantWorking, restaurantTitle }: Props) => {
	const { id, title, image, amount, infoBadges } = restaurantProduct;

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
					key={id}
					to={title}
					state={{ restaurantProduct, isRestaurantWorking, flowId, restaurantTitle }}
					style={{ position: 'relative' }}>
					{image && (
						<>
							<CardMedia image={image} sx={{ height: '11rem', borderRadius: '1rem' }} />
							{infoBadges?.map(icon => (
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
					{amount !== 0 && (
						<ImageBackdrop>
							<Typography variant={'body1'} fontSize={'1.5rem'}>
								{amount}
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
							{title}
						</Typography>
					</CardContent>
				</Link>
				{isRestaurantWorking ? (
					<CardActions
						sx={{
							p: 0,
						}}>
						<AmountButtons showText product={restaurantProduct} restaurantTitle={restaurantTitle} />
					</CardActions>
				) : (
					<InfoBadge text={'We are closed'} />
				)}
			</Card>
		</>
	);
};
