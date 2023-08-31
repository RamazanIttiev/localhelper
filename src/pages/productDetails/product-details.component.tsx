import React from 'react';
import { IconBadge } from 'reactkit/iconBadge';

import { Box, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';

import { MuiCarousel } from 'components/carousel';

import { ProductModel } from 'models/product.model';

interface Props {
	product: ProductModel;
}

export const ProductDetails = ({ product }: Props) => {
	const { image, title, description, infoBadges } = product;

	return (
		<Container sx={{ pt: 2, pb: 2, px: 6 }} maxWidth={'sm'}>
			<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
				<CardMedia>
					{image.length === 1 ? (
						<>
							<Box
								component={'img'}
								src={image[0].url}
								alt={product.title}
								width={'100%'}
								sx={{
									borderRadius: 3,
									height: '20rem',
									margin: '0 auto',
									display: 'block',
									objectFit: 'cover',
								}}
							/>
							{infoBadges?.map(icon => (
								<IconBadge
									key={icon}
									icon={icon}
									containerStyles={{
										position: 'absolute',
										top: '0.5rem',
										left: '1.5rem',
									}}
									iconStyles={{ margin: '0 2px' }}
								/>
							))}
						</>
					) : (
						<MuiCarousel key={title} images={image} title={title} infoBadges={infoBadges} />
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
			</Card>
		</Container>
	);
};
