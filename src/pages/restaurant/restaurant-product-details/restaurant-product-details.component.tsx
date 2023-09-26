import React from 'react';
import { ActionButton } from 'reactkit/actionButton';
import { InfoBadge } from 'reactkit/infoBadge';

import { Box, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';

import { theme } from 'theme';

import { AmountButtons } from 'components/amountButtons';
import { MuiCarousel } from 'components/carousel';

import { isUserAgentTelegram } from 'utils/deviceInfo';
import { openTelegram } from 'utils/service';

import { useShoppingCart } from 'context/cart.context';

import skeletonImage from 'assets/food.webp';

import { RestaurantProduct } from '../restaurant-product/restaurant-product.model';
import { Restaurant } from '../restaurant.model';

interface Props {
	readonly restaurant: Restaurant;
	readonly restaurantProduct: RestaurantProduct;
}

export const RestaurantProductDetails = ({ restaurantProduct, restaurant }: Props) => {
	const { getItemAmount } = useShoppingCart();

	const { isWorking } = restaurant;
	// TODO add amount backdrop
	const { title, image, amount, iconBadges, description, price } = restaurantProduct;

	const isRemoveVisible = getItemAmount(restaurantProduct.id) > 0;

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
								product={restaurantProduct}
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
