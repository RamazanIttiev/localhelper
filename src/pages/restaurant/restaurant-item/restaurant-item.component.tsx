import React from 'react';

import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import { isUserAgentTelegram } from 'common/utils/deviceInfo';

import { theme } from 'ui/theme/theme';

import { Restaurant } from '../restaurant.model';
import { RestaurantItem } from './restaurant-item.model';
import { IconBadges } from 'ui/atoms/iconBadges';
import { ImageBackdrop } from 'ui/atoms/imageBackdrop';
import { InfoBadge } from 'ui/atoms/infoBadge';
import { AmountButtons } from 'ui/organisms/amountButtons';

interface Props {
	readonly flowId: string;
	readonly restaurant: Restaurant;
	readonly restaurantItem: RestaurantItem;
}

export const RestaurantItemCard = ({ flowId, restaurantItem, restaurant }: Props) => {
	const { isWorking } = restaurant;
	const { id, title, image, quantity, iconBadges, price } = restaurantItem;

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
				{/* TODO fix state when routing to detains page*/}
				<Box position={'relative'}>
					{image && (
						<>
							<CardMedia
								image={image[0].url}
								sx={{ height: '11rem', borderRadius: theme.tg_theme.borderRadius.base }}
							/>
							<IconBadges iconBadges={iconBadges} />
						</>
					)}
					{quantity !== 0 && (
						<ImageBackdrop>
							<Typography variant={'body1'} fontSize={'1.5rem'}>
								{quantity}
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
				</Box>
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
