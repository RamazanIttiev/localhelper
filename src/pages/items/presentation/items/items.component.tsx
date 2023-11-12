import React from 'react';
import { ActionButton } from 'reactkit/actionButton';

import { Container, Grid } from '@mui/material';

import { Category } from 'pages/categories/category.model';
import { Item } from 'pages/item/domain/item.model';
import { ItemContainer } from 'pages/item/presentation/item/item.container';
import { Items } from 'pages/items/domain/items.model';

import { HeaderSkeleton } from 'components/skeletons/headerSkeleton';
import { ItemSkeleton } from 'components/skeletons/itemSkeleton';

import { isUserAgentTelegram } from 'utils/deviceInfo';
import { openTelegram } from 'utils/service';

import { ItemsHeader } from '../items-header/items-header';

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
