import React from 'react';
import { InfoBadge } from 'reactkit/infoBadge';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { theme } from 'theme';

import { Feed } from 'pages/feed/feed-card/feed-card.model';

interface Props {
	feedCard: Feed;
}

export const FeedCardComponent = ({ feedCard }: Props) => {
	const { title, place, description, date, image } = feedCard;

	const eventDate = new Date(date).toDateString();

	return (
		<Card sx={{ display: 'block', background: '#303030', p: '0.5rem', borderRadius: '1rem' }}>
			<Box
				component={'img'}
				src={image[0].url}
				sx={{ height: '17rem', borderRadius: '1rem', objectFit: 'cover', width: '100%' }}
			/>
			<CardContent sx={{ p: 1, pb: '0 !important' }}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '1rem ' }}>
					<Box>
						<Typography
							sx={{
								fontWeight: 900,
								fontSize: '1.25rem',
								color: theme.palette.text.primary,
								lineHeight: 1,
								mb: '0.25rem',
							}}>
							{title}
						</Typography>
						<Typography variant={'body2'}>{eventDate}</Typography>
					</Box>
					<InfoBadge text={place} sx={{ margin: '1rem 0' }} />
				</Box>
				<Typography sx={{ fontSize: '0.75rem', color: theme.palette.text.primary, m: '0.5rem 0' }}>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};
