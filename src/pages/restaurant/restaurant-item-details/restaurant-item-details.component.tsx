import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useCartService } from 'pages/cart/domain/service/cart.service.ts';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';
import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';
import { openTelegram } from 'common/utils/service.ts';

import skeletonImage from 'assets/food.webp';

import { ActionButton } from 'ui/atoms/actionButton.tsx';
import { InfoBadge } from 'ui/atoms/infoBadge.tsx';
import { AmountButtons } from 'ui/organisms/amountButtons.tsx';
import { MuiCarousel } from 'ui/organisms/carousel.tsx';

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
