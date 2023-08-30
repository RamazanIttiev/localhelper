import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { setHaptic } from '../../../actions/webApp-actions';
import { Link } from 'react-router-dom';
import { IconBadge } from '../../../reactkit/iconBadge';
import { ImageBackdrop } from '../../../components/imageBackdrop';
import { AmountButtons } from '../../../components/amountButtons';
import { InfoBadge } from '../../../reactkit/infoBadge';
import { RestaurantProductModel } from './restaurant-product.model';
import { RestaurantModel } from '../../../models/product.model';
import { isUserAgentTelegram } from '../../../utils/deviceInfo';

interface Props {
	readonly flowId: string;
	readonly restaurant: RestaurantModel;
	readonly restaurantProduct: RestaurantProductModel;
}

export const RestaurantProductCard = ({ flowId, restaurantProduct, restaurant }: Props) => {
	const { isWorking } = restaurant;
	const { id, title, image, amount, infoBadges, price } = restaurantProduct;

	return (
		<>
			<Card
				onClick={() => setHaptic('light')}
				sx={{
					pb: 2,
					display: 'flex',
					height: 'auto',
					boxShadow: 'none',
					flexDirection: 'column',
					background: 'transparent',
					justifyContent: 'space-between',
				}}>
				<Link
					key={id}
					to={title}
					state={{ restaurantProduct, restaurant, flowId }}
					style={{ position: 'relative' }}>
					{image && (
						<>
							<CardMedia image={image[0].url} sx={{ height: '11rem', borderRadius: '1rem' }} />
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

				{isUserAgentTelegram ? (
					isWorking ? (
						<CardActions
							sx={{
								p: 0,
								mt: '1rem',
							}}>
							<AmountButtons product={restaurantProduct} restaurantTitle={restaurant.title} />
						</CardActions>
					) : (
						<InfoBadge text={'We are closed'} />
					)
				) : (
					<InfoBadge text={`${price.toString()} Rs`} />
				)}
			</Card>
		</>
	);
};
