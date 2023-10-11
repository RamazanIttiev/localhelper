import React from 'react';
import { IconBadges } from 'reactkit/iconBadges';
import { InfoBadge } from 'reactkit/infoBadge';
import { Link } from 'reactkit/link';

import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { AmountButtons } from 'components/amountButtons';
import { ImageBackdrop } from 'components/imageBackdrop';

import { isUserAgentTelegram } from 'utils/deviceInfo';

import { theme } from 'theme/theme';

import { Restaurant } from '../restaurant.model';
import { RestaurantItem } from './restaurant-item.model';

interface Props {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly restaurantItem: RestaurantItem;
}

export const RestaurantItemCard = ({ flowId, restaurantItem, restaurant }: Props) => {
	const { isWorking } = restaurant;
	const { id, title, image, amount, iconBadges, price } = restaurantItem;

	return (
		<>
			<Card
				sx={{
					pb: 2,
					display: 'flex',
					height: 'auto',
					boxShadow: 'none',
					flexDirection: 'column',
					background: 'transparent',
					justifyContent: 'space-between',
				}}>
				<Link key={id} to={title} state={{ restaurantItem, restaurant, flowId }}>
					{image && (
						<>
							<CardMedia
								image={image[0].url}
								sx={{ height: '11rem', borderRadius: theme.tg_theme.borderRadius.base }}
							/>
							<IconBadges iconBadges={iconBadges} />
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
							<AmountButtons item={restaurantItem} restaurantTitle={restaurant.title} />
						</CardActions>
					) : (
						<InfoBadge text={'We are closed'} sx={{ mt: 1 }} />
					)
				) : (
					<InfoBadge text={`${price.toString()} Rs`} sx={{ mt: 1 }} />
				)}
			</Card>
		</>
	);
};
