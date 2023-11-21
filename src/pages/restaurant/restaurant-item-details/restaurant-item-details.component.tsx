import React from 'react';

import { Box, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';

import { useCartService } from 'pages/cart/domain/service/cart.service';

import { isUserAgentTelegram } from 'common/utils/deviceInfo';
import { openTelegram } from 'common/utils/service';

import skeletonImage from 'assets/food.webp';

import { RestaurantItem } from '../restaurant-item/restaurant-item.model';
import { Restaurant } from '../restaurant.model';
import { ActionButton } from 'ui/atoms/actionButton';
import { InfoBadge } from 'ui/atoms/infoBadge';
import { AmountButtons } from 'ui/organisms/amountButtons';
import { MuiCarousel } from 'ui/organisms/carousel';

interface Props {
	readonly restaurant: Restaurant;
	readonly restaurantItem: RestaurantItem;
}

export const RestaurantItemDetails = ({ restaurantItem, restaurant }: Props) => {
	const { getItemQuantity } = useCartService();

	const { isWorking } = restaurant;
	// TODO add quantity backdrop
	const { title, image, iconBadges, description, price } = restaurantItem;

	const isRemoveVisible = getItemQuantity(restaurantItem.id) > 0;

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
				<CardMedia>
					{image !== undefined ? (
						<MuiCarousel key={title} images={image} title={title} iconBadges={iconBadges} />
					) : (
						<Box
							component={'img'}
							src={skeletonImage}
							alt={title}
							width={'100%'}
							sx={{
								borderRadius: 3,
								height: '20rem',
								margin: '0 auto',
								display: 'block',
								objectFit: 'cover',
							}}
						/>
					)}
				</CardMedia>

				<CardContent sx={{ m: '1rem 0', p: 0 }}>
					<Typography id="transition-modal-title" variant="h6" component="h2" fontWeight={700}>
						{title}
					</Typography>
					{description && (
						<Typography
							variant={'body1'}
							sx={{
								mt: 2,
								padding: '1rem',
								borderRadius: '1rem',
								color: '#fff',
								background: '#303030',
							}}>
							{description}
						</Typography>
					)}
				</CardContent>

				{isUserAgentTelegram ? (
					isWorking ? (
						<CardActions sx={{ flexDirection: 'column', p: 0 }}>
							<AmountButtons
								styles={{
									maxWidth: '13rem',
									width: isRemoveVisible ? '13rem' : '12rem',
								}}
								restaurantTitle={restaurant.title}
								item={restaurantItem}
							/>
						</CardActions>
					) : (
						<InfoBadge text={'We are closed'} />
					)
				) : (
					<>
						<InfoBadge text={`${price.toString()} Rs`} />
						<ActionButton isMainButton text={'Order in telegram'} handleClick={openTelegram} />
					</>
				)}
			</Card>
		</Container>
	);
};
