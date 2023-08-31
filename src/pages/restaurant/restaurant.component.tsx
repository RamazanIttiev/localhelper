import React from 'react';
import { Container, Grid } from '@mui/material';
import { FoodModel, RestaurantModel } from '../../models/product.model';
import { RestaurantHeader } from './restaurant-header/restaurant-header';
import { RestaurantProductContainer } from './restaurant-product/restaurant-product.container';
import { HeaderSkeleton } from '../../components/headerSkeleton';
import { ProductSkeleton } from '../../components/productSkeleton';

interface Props {
	readonly flowId: string;
	readonly products: FoodModel[] | undefined;
	readonly restaurant: RestaurantModel | undefined;
}

export const Restaurant = ({ restaurant, products, flowId }: Props) => {
	return (
		<>
			{!restaurant ? <HeaderSkeleton /> : <RestaurantHeader restaurant={restaurant} />}
			<Container sx={{ pt: 2 }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{products && restaurant ? (
						products.map((product: FoodModel) => {
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
