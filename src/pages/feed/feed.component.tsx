import { Container } from '@mui/material';
import { Feed } from 'pages/feed/feed-card/feed-card.model.ts';
import { FeedSkeleton } from 'ui/atoms/skeletons/feedSkeleton.tsx';
import { FeedCardComponent } from './feed-card/feed-card.tsx';

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
