import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Category } from 'pages/categories/category.model.ts';
import { Items } from 'pages/items/domain/items.model.ts';

import { categoryQuery } from 'api/airtable/category.ts';
import { itemsQuery } from 'api/airtable/items.ts';

import { ItemsComponent } from './items.component.tsx';

export const ItemsContainer = () => {
	const { categoryId } = useParams();

	const { data: category } = useQuery<Category>(categoryQuery(categoryId));
	const { data: items } = useQuery<Items>(itemsQuery(categoryId));

	const flowId = category?.flowId || '';

	return <ItemsComponent items={items} flowId={flowId} category={category} />;
};
