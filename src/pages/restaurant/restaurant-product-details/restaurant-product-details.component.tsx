import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { MuiCarousel } from '../../../components/carousel';
import dishImage from '../../../assets/food.webp';
import { AmountButtons } from '../../../components/amountButtons';
import { theme } from '../../../theme';
import { RestaurantProductModel } from '../restaurant-product/restaurant-product.model';
import { useShoppingCart } from '../../../context/cart.context';
import { RestaurantModel } from '../../../models/product.model';
import { InfoBadge } from '../../../reactkit/infoBadge';
import { isUserAgentTelegram } from '../../../utils/deviceInfo';

interface Props {
	readonly restaurant: RestaurantModel;
	readonly restaurantProduct: RestaurantProductModel;
}

export const RestaurantProductDetails = ({ restaurantProduct, restaurant }: Props) => {
	const { getItemAmount } = useShoppingCart();

	const { isWorking } = restaurant;
	// TODO add amount backdrop
	const { title, image, amount, infoBadges, description } = restaurantProduct;

	const isRemoveVisible = getItemAmount(restaurantProduct.id) > 0;

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
				<CardMedia>
					{image !== undefined ? (
						<MuiCarousel key={title} images={image} title={title} infoBadges={infoBadges} />
					) : (
						<Box
							component={'img'}
							src={dishImage}
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

				<CardContent sx={{ m: '2rem 0', p: 0 }}>
					<Box sx={{ width: '100%' }}>
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
					</Box>
				</CardContent>

				{isUserAgentTelegram ? (
					isWorking ? (
						<CardActions sx={{ flexDirection: 'column', p: 0 }}>
							<AmountButtons
								styles={{
									maxWidth: '13rem',
									width: isRemoveVisible ? '13rem' : '12rem',
									background: theme.palette.background.paper,
								}}
								restaurantTitle={restaurant.title}
								product={restaurantProduct}
							/>
						</CardActions>
					) : (
						<InfoBadge text={'We are closed'} />
					)
				) : null}
			</Card>
		</Container>
	);
};
