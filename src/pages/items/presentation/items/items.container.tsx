import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import { Category } from 'pages/categories/category.model';
import { Items } from 'pages/items/domain/items.model';

import { categoryQuery } from 'api/airtable/category';
import { itemsQuery } from 'api/airtable/items';

import { ItemsComponent } from './items.component';

export const ItemsContainer = () => {
	const { categoryId } = useParams();

	const { data: category } = useQuery<Category>(categoryQuery(categoryId));
	const { data: items } = useQuery<Items>(itemsQuery(categoryId));

	const flowId = category?.flowId || '';

	return <ItemsComponent items={items} flowId={flowId} category={category} />;
};
