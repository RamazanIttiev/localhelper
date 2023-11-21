import React from 'react';

import { Container, Grid } from '@mui/material';

import { Category } from 'pages/categories/category.model';
import { Items } from 'pages/items/domain/items.model';

import { isUserAgentTelegram } from 'common/utils/deviceInfo';
import { openTelegram } from 'common/utils/service';

import { ItemsHeader } from '../items-header/items-header';
import { ActionButton } from 'ui/atoms/actionButton';
import { HeaderSkeleton } from 'ui/atoms/skeletons/headerSkeleton';
import { ItemSkeleton } from 'ui/atoms/skeletons/itemSkeleton';
import { Item } from 'ui/organisms/item/domain/item.model';
import { ItemContainer } from 'ui/organisms/item/presentation/item/item.container';

interface Props {
	flowId: string;
	items: Items | undefined;
	category: Category | undefined;
}

export const ItemsComponent = ({ items, category, flowId }: Props) => {
	return (
		<>
			{!category ? <HeaderSkeleton /> : <ItemsHeader category={category} />}
			<Container sx={{ pt: 2, pb: 6 }} maxWidth={'sm'}>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{items ? (
						<>
							{items.map((item: Item) => {
								return (
									<Grid item xs={6} md={5} key={item.id}>
										<ItemContainer item={item} flowId={flowId} />
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
