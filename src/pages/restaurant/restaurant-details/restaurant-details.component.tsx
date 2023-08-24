import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { MuiCarousel } from '../../../components/carousel';
import dishImage from '../../../assets/food.webp';
import { AmountButtons } from '../../../components/amountButtons';
import { theme } from '../../../theme';
import { RestaurantProductModel } from '../components/restaurant-product/restaurant-product.model';
import { useShoppingCart } from '../../../context/cart.context';

interface Props {
	restaurantTitle: string;
	isRestaurantWorking: boolean;
	restaurantProduct: RestaurantProductModel;
}

export const RestaurantDetails = ({ restaurantProduct, isRestaurantWorking, restaurantTitle }: Props) => {
	const { getItemAmount } = useShoppingCart();

	const isRemoveVisible = getItemAmount(restaurantProduct.id) > 0;

	// TODO add amount backdrop and display infoBadges
	const { title, image, amount, infoBadges, description } = restaurantProduct;

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
				<CardMedia>
					{image !== undefined ? (
						<MuiCarousel key={title} product={restaurantProduct} />
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

				{isRestaurantWorking ? (
					<CardActions sx={{ flexDirection: 'column', p: 0 }}>
						<AmountButtons
							styles={{
								maxWidth: '13rem',
								width: isRemoveVisible ? '13rem' : '12rem',
								background: theme.palette.background.paper,
							}}
							product={restaurantProduct}
							restaurantTitle={restaurantTitle}
						/>
					</CardActions>
				) : (
					<Typography
						variant="body2"
						sx={{
							padding: '0.5rem',
							width: 'fit-content',
							borderRadius: '1rem',
							background: theme.palette.background.paper,
						}}>
						We are closed
					</Typography>
				)}
			</Card>
		</Container>
	);
};
