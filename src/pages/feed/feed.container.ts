import { useQuery } from '@tanstack/react-query';
import { createElement } from 'react';

import { Feed } from 'pages/feed/feed-card/feed-card.model';
import { FeedComponent } from 'pages/feed/feed.component';

import { feedQuery } from 'api/airtable/feed';

export const FeedContainer = () => {
	const { data: feed } = useQuery<Feed[]>(feedQuery());

	return createElement(FeedComponent, { feed });
};
