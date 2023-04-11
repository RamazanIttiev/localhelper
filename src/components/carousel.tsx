import React from 'react';
import { Box } from '@mui/material';
import { ProductModel } from '../pages/productDetails/models/productModel';
import Carousel from 'react-material-ui-carousel';
import { InfoBadge } from './reactkit/infoBadge';

interface CarouselProps {
	selectedProduct: ProductModel;
}

export const MuiCarousel = ({ selectedProduct }: CarouselProps) => {
	return selectedProduct.image.length === 1 ? (
		<>
			<Box
				component={'img'}
				src={selectedProduct.image[0].url}
				alt={selectedProduct.image[0].alt}
				width={'100%'}
				sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, height: '20rem' }}
			/>
			{selectedProduct.infoBadges && (
				<InfoBadge
					iterable={selectedProduct.infoBadges}
					containerStyles={{
						display: 'flex',
						position: 'absolute',
						top: '0.5rem',
						left: '0.5rem',
					}}
					iconStyles={{ margin: '0 2px' }}
				/>
			)}
		</>
	) : (
		<Carousel
			autoPlay={false}
			stopAutoPlayOnHover
			animation={'slide'}
			navButtonsAlwaysVisible
			indicatorIconButtonProps={{ style: { margin: '0 0.3rem' } }}
			activeIndicatorIconButtonProps={{ style: { color: '#212121' } }}>
			{selectedProduct.image.map(({ url, alt }) => {
				return (
					<React.Fragment key={alt}>
						<Box
							component={'img'}
							src={url}
							alt={alt}
							width={'100%'}
							sx={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16, height: '20rem' }}
						/>
						{selectedProduct.infoBadges && (
							<InfoBadge
								iterable={selectedProduct.infoBadges}
								containerStyles={{
									display: 'flex',
									position: 'absolute',
									top: '0.5rem',
									left: '0.5rem',
								}}
								iconStyles={{ margin: '0 2px' }}
							/>
						)}
					</React.Fragment>
				);
			})}
		</Carousel>
	);
};
