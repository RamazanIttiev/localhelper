import React from 'react';
import { Box, useTheme } from '@mui/material';
import { ProductModel } from '../models/productModel';
import Carousel from 'react-material-ui-carousel';
import { isUserAgentTelegram } from '../utils/deviceInfo';
import { isDesktop } from 'react-device-detect';
import { InfoBadge } from '../reactkit/infoBadge';

interface CarouselProps {
	selectedProduct: ProductModel;
}

export const MuiCarousel = ({ selectedProduct }: CarouselProps) => {
	const theme = useTheme();

	return selectedProduct.image.length === 1 ? (
		<>
			<Box
				component={'img'}
				src={selectedProduct.image[0].url}
				alt={selectedProduct.image[0].alt}
				width={'100%'}
				sx={{
					borderRadius: 3,
					height: '20rem',
					margin: '0 auto',
					display: 'block',
					objectFit: 'cover',
				}}
			/>
			{selectedProduct.infoBadges &&
				selectedProduct.infoBadges.map(icon => (
					<InfoBadge
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
		<Carousel
			autoPlay={false}
			stopAutoPlayOnHover
			animation={'slide'}
			navButtonsAlwaysInvisible={isUserAgentTelegram && !isDesktop}
			navButtonsAlwaysVisible={!isUserAgentTelegram && isDesktop}
			indicatorIconButtonProps={{ style: { margin: '0 0.3rem' } }}
			activeIndicatorIconButtonProps={{ style: { color: theme.palette.background.paper } }}>
			{selectedProduct.image.map(({ url, alt }) => {
				return (
					<React.Fragment key={alt}>
						<Box
							component={'img'}
							src={url}
							alt={alt}
							width={'100%'}
							sx={{
								borderRadius: 3,
								height: '20rem',
								margin: '0 auto',
								display: 'block',
								objectFit: 'cover',
							}}
						/>
						{selectedProduct.infoBadges &&
							selectedProduct.infoBadges.map(icon => (
								<InfoBadge
									icon={icon}
									containerStyles={{
										position: 'absolute',
										top: '0.5rem',
										left: '0.5rem',
									}}
									iconStyles={{ margin: '0 2px' }}
								/>
							))}
					</React.Fragment>
				);
			})}
		</Carousel>
	);
};
