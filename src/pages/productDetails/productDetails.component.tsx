import React from 'react';
import { ErrorType } from '../../models/error.model';
import { MuiCarousel } from '../../components/carousel';
import { ProductModel } from '../../models/product.model';
import { LoaderButton } from '../../reactkit/loaderButton';
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

import dishImage from '../../assets/food.webp';
import { isUserAgentTelegram } from '../../utils/deviceInfo';

interface Props {
	loading: boolean;
	errorState: ErrorType;
	selectedProduct: ProductModel;
	handleProductOrder: () => Promise<Response | undefined>;
}

export const ProductDetailsUI = ({ loading, errorState, selectedProduct, handleProductOrder }: Props) => {
	return (
		<Card sx={{ position: 'relative', background: 'transparent', boxShadow: 'none' }}>
			<CardMedia>
				{selectedProduct?.image !== undefined ? (
					<MuiCarousel key={selectedProduct.title} product={selectedProduct} />
				) : (
					<Box
						component={'img'}
						src={dishImage}
						alt={selectedProduct?.title}
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
						{selectedProduct?.title}
					</Typography>
					{selectedProduct?.description && (
						<Typography
							variant={'body1'}
							sx={{
								mt: 2,
								padding: '1rem',
								borderRadius: '1rem',
								color: '#fff',
								background: '#303030',
							}}>
							{selectedProduct?.description}
						</Typography>
					)}
				</Box>
			</CardContent>

			{!isUserAgentTelegram && (
				<CardActions sx={{ flexDirection: 'column', p: 0 }}>
					<LoaderButton
						isMainButton
						loading={loading}
						errorState={errorState}
						handleClick={handleProductOrder}
						text={`${selectedProduct?.price} Rs`}
					/>
				</CardActions>
			)}
		</Card>
	);
};
