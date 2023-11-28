import { useQuery } from '@tanstack/react-query';
import { feedQuery } from 'api/airtable/feed.ts';
import { createElement } from 'react';
import { Feed } from './feed-card/feed-card.model.ts';
import { FeedComponent } from './feed.component.tsx';

export const FeedContainer = () => {
	const { data: feed } = useQuery<Feed[]>(feedQuery());

	return createElement(FeedComponent, { feed });
};
