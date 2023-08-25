import React from 'react';
import { isUserAgentTelegram } from '../../utils/deviceInfo';
import { Container, Grid } from '@mui/material';
import { FoodModel, RestaurantModel } from '../../models/product.model';
import { RestaurantHeader } from './components/restaurant-header/restaurant-header';
import { RestaurantProductContainer } from './components/restaurant-product/restaurant-product.container';
import { LoaderButton } from '../../reactkit/loaderButton';

interface Props {
	readonly flowId: string;
	readonly isCartEmpty: boolean;
	readonly products: FoodModel[] | undefined;
	readonly restaurant: RestaurantModel | undefined;
	readonly navigateToCart: () => void;
}

export const Restaurant = ({ restaurant, products, flowId, navigateToCart, isCartEmpty }: Props) => {
	return (
		<>
			{restaurant && <RestaurantHeader restaurant={restaurant} />}
			<Container sx={{ pt: 2, pb: !isUserAgentTelegram ? '3rem' : null }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{products &&
						restaurant &&
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
						})}
				</Grid>
				{!isCartEmpty && !isUserAgentTelegram && (
					<LoaderButton isMainButton text={'Order'} handleClick={navigateToCart} />
				)}
			</Container>
		</>
	);
};
