import React from 'react';

import { Container } from '@mui/material';

import { FeedCardComponent } from 'pages/feed/feed-card/feed-card';
import { Feed } from 'pages/feed/feed-card/feed-card.model';

import { FeedSkeleton } from 'ui/atoms/skeletons/feedSkeleton';

interface Props {
	feed: Feed[] | undefined;
}

export const FeedComponent = ({ feed }: Props) => {
	return (
		<Container sx={{ pt: 2 }} maxWidth={'sm'}>
			{!feed ? (
				<FeedSkeleton />
			) : (
				feed.map(feedCard => {
					return <FeedCardComponent key={feedCard.id} feedCard={feedCard} />;
				})
			)}
		</Container>
	);
};
