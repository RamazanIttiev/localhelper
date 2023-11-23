import React from 'react';

import { Container, Grid } from '@mui/material';

import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model';
import { Restaurant } from 'pages/restaurant/restaurant.model';

import { isUserAgentTelegram } from 'common/utils/deviceInfo';
import { openTelegram } from 'common/utils/service';

import { RestaurantHeader } from './restaurant-header/restaurant-header';
import { RestaurantItemContainer } from './restaurant-item/restaurant-item.container';
import { ActionButton } from 'ui/atoms/actionButton';
import { HeaderSkeleton } from 'ui/molecules/skeletons/headerSkeleton';
import { ItemSkeleton } from 'ui/molecules/skeletons/itemSkeleton';

interface Props {
	readonly flowId: string;
	readonly items: RestaurantItem[] | undefined;
	readonly restaurant: Restaurant | undefined;
}

export const RestaurantComponent = ({ restaurant, items, flowId }: Props) => {
	return (
		<>
			{!restaurant ? <HeaderSkeleton /> : <RestaurantHeader restaurant={restaurant} />}
			<Container sx={{ pt: 2, pb: 6 }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{items && restaurant ? (
						<>
							{items.map((item: RestaurantItem) => {
								return (
									<Grid item xs={6} md={5} key={item.id}>
										<RestaurantItemContainer restaurant={restaurant} item={item} flowId={flowId} />
									</Grid>
								);
							})}

							{!isUserAgentTelegram && (
								<ActionButton isMainButton text={'Order in telegram'} handleClick={openTelegram} />
							)}
						</>
					) : (
						<ItemSkeleton />
					)}
				</Grid>
			</Container>
		</>
	);
};
