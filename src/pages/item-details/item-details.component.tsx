import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';
import { openTelegram } from 'common/utils/service.ts';

import { theme } from 'ui/theme/theme.ts';

import { Item } from 'ui/organisms/item/domain/item.model.ts';
import { Container, Card, CardMedia, Box, CardContent, Typography } from '@mui/material';
import { ActionButton } from 'ui/atoms/actionButton.tsx';
import { IconBadges } from 'ui/atoms/iconBadges.tsx';
import { MuiCarousel } from 'ui/organisms/carousel.tsx';

interface Props {
	item: Item;
}

export const ItemDetails = ({ item }: Props) => {
	const { image, title, description, iconBadges } = item;

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
				<CardMedia>
					{image.length === 1 ? (
						<>
							<Box
								component={'img'}
								src={image[0].url}
								alt={item.title}
								width={'100%'}
								sx={{
									borderRadius: 3,
									height: '20rem',
									margin: '0 auto',
									display: 'block',
									objectFit: 'cover',
								}}
							/>
							<IconBadges iconBadges={iconBadges} />
						</>
					) : (
						<MuiCarousel key={title} images={image} title={title} iconBadges={iconBadges} />
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
									background: theme.tg_theme.palette.bg_color,
								}}>
								{description}
							</Typography>
						)}
					</Box>
				</CardContent>
			</Card>
			{!isUserAgentTelegram && (
				<ActionButton isMainButton text={'Order in telegram'} handleClick={openTelegram} />
			)}
		</Container>
	);
};
