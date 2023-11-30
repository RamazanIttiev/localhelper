import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { Category } from 'pages/categories/category.model.ts';
import { Items } from 'pages/items/domain/items.model.ts';

import { isUserAgentTelegram } from 'common/utils/deviceInfo.ts';
import { openTelegram } from 'common/utils/service.ts';

import { ItemsHeader } from '../items-header/items-header.tsx';
import { ActionButton } from 'ui/atoms/actionButton.tsx';
import { HeaderSkeleton } from 'ui/atoms/skeletons/headerSkeleton.tsx';
import { ItemSkeleton } from 'ui/atoms/skeletons/itemSkeleton.tsx';
import { Item } from 'ui/organisms/item/domain/item.model.ts';
import { ItemContainer } from 'ui/organisms/item/presentation/item/item.container.tsx';

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
