import React from 'react';

import { Container, Grid } from '@mui/material';

import { RestaurantProduct } from 'pages/restaurant/restaurant-product/restaurant-product.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { HeaderSkeleton } from 'components/headerSkeleton';
import { ProductSkeleton } from 'components/productSkeleton';

import { RestaurantHeader } from './restaurant-header/restaurant-header';
import { RestaurantProductContainer } from './restaurant-product/restaurant-product.container';

interface Props {
	readonly flowId: string;
	readonly products: RestaurantProduct[] | undefined;
	readonly restaurant: Restaurant | undefined;
}

export const RestaurantComponent = ({ restaurant, products, flowId }: Props) => {
	return (
		<>
			{!restaurant ? <HeaderSkeleton /> : <RestaurantHeader restaurant={restaurant} />}
			<Container sx={{ pt: 2 }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{products && restaurant ? (
						products.map((product: RestaurantProduct) => {
							return (
								<Grid item xs={6} md={5} key={product.id}>
									<RestaurantProductContainer
										restaurant={restaurant}
										product={product}
										flowId={flowId}
									/>
								</Grid>
							);
						})
					) : (
						<ProductSkeleton />
					)}
				</Grid>
			</Container>
		</>
	);
};
