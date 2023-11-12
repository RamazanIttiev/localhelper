import React from 'react';
import { ActionButton } from 'reactkit/actionButton';
import { IconBadges } from 'reactkit/iconBadges';
import { Link } from 'reactkit/link';

import { Box, Card, CardContent, Typography } from '@mui/material';

import { Item } from 'pages/item/domain/item.model';

import { isUserAgentTelegram } from 'utils/deviceInfo';

import { theme } from 'theme/theme';

interface Props {
	flowId: string;
	item: Item;
	handleClick: () => void;
}

export const ItemComponent = ({ flowId, item, handleClick }: Props) => {
	return (
		<Card
			sx={{
				pb: 2,
				display: 'flex',
				height: 'auto',
				boxShadow: 'none',
				flexDirection: 'column',
				background: 'transparent',
				justifyContent: 'space-between',
			}}>
			<Link key={item.id} to={item.title.toLowerCase()} state={{ item, flowId }}>
				<>
					<Box
						component={'img'}
						src={item.image[0].url}
						alt={item.title}
						sx={{
							display: 'block',
							width: '100%',
							height: '11rem',
							borderRadius: theme.tg_theme.borderRadius.base,
							objectFit: 'cover',
						}}
					/>
					<IconBadges iconBadges={item.iconBadges} />
				</>
				<CardContent
					sx={{
						'&:last-child': { pb: 0 },
						p: 0,
						height: '100%',
						display: 'flex',
						alignItems: 'baseline',
						flexDirection: 'column',
						justifyContent: 'center',
						mt: '1rem',
						mb: '0.5rem',
					}}>
					<Typography
						sx={{
							m: 0,
							display: 'flex',
							fontSize: '0.8rem',
							fontWeight: '600',
							alignItems: 'center',
							justifyContent: 'center',
							textTransform: 'capitalize',
						}}
						component="h3">
						{item.title.toLowerCase()}
					</Typography>
				</CardContent>
			</Link>
			{isUserAgentTelegram && <ActionButton text={`${item.price} Rs`} handleClick={handleClick} />}
		</Card>
	);
};
