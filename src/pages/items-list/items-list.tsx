import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { ActionButton } from 'reactkit/actionButton';

import { Container, Grid } from '@mui/material';

import { Category } from 'pages/categories/category.model';
import { Item } from 'pages/items-list/item/item.model';

import { HeaderSkeleton } from 'components/skeletons/headerSkeleton';
import { ItemSkeleton } from 'components/skeletons/itemSkeleton';

import { isUserAgentTelegram } from 'utils/deviceInfo';
import { openTelegram } from 'utils/service';

import { categoryQuery } from 'api/airtable/category';
import { itemsQuery } from 'api/airtable/items';

import { ItemContainer } from './item/item.container';
import { ItemsHeader } from './items-header';

export const ItemsList = () => {
	const { categoryId } = useParams();

	const { data: category } = useQuery<Category>(categoryQuery(categoryId));
	const { data: items } = useQuery<Item[]>(itemsQuery(categoryId));

	const flowId = category?.flowId || '';

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
