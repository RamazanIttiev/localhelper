import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';
import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';

import { theme } from 'ui/theme/theme.ts';

import { IconBadges } from 'ui/atoms/iconBadges.tsx';
import { ImageBackdrop } from 'ui/atoms/imageBackdrop.tsx';
import { InfoBadge } from 'ui/atoms/infoBadge.tsx';
import { AmountButtons } from 'ui/organisms/amountButtons.tsx';

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
				<Link
					key={id}
					to={title}
					style={{ position: 'relative' }}
					state={{ restaurantItem, restaurant, flowId }}>
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
