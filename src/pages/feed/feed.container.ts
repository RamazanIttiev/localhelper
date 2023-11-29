import { useQuery } from '@tanstack/react-query';
import { createElement } from 'react';

import { feedQuery } from 'api/airtable/feed.ts';

import { Feed } from './feed-card/feed-card.model.ts';
import { FeedComponent } from './feed.component.tsx';

export const FeedContainer = () => {
	const { data: feed } = useQuery<Feed[]>(feedQuery());

	return createElement(FeedComponent, { feed });
};
