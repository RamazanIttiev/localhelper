import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { RestaurantItemContainer } from 'pages/restaurant/restaurant-item/restaurant-item.container.tsx';
import { RestaurantItem } from 'pages/restaurant/restaurant-item/restaurant-item.model.ts';
import { Restaurant } from 'pages/restaurant/restaurant.model.ts';

import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';
import { openTelegram } from 'common/utils/service.ts';

import { RestaurantHeader } from './restaurant-header/restaurant-header.tsx';
import { ActionButton } from 'ui/atoms/actionButton.tsx';
import { HeaderSkeleton } from 'ui/atoms/skeletons/headerSkeleton.tsx';
import { ItemSkeleton } from 'ui/atoms/skeletons/itemSkeleton.tsx';

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
